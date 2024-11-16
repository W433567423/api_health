import type { IResData } from '@/modules/app';
import {
  type CallHandler,
  type ExecutionContext,
  Inject,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { map } from 'rxjs';
import { getInfoReq } from 'src/global/helper/getInfoReq';
import { Logger } from 'winston';

@Injectable()
export default class TransformInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: IResData<object | undefined>) => {
        this.logger.info('response', {
          responseData: data,
          req: getInfoReq(context.switchToHttp().getRequest()),
        });
        return {
          code: typeof data.code === 'number' ? data.code : 200,
          msg: typeof data.msg === 'string' ? data.msg : '请求成功',
          data: data?.data,
        };
      }),
    );
  }
}
