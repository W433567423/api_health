import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getInfoReq } from '@/global/helper/getInfoReq';
import { Request } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // ①
  ) {}
  use(req: Request, _res: Response, next: () => void) {
    this.logger.warn('route', {
      req: getInfoReq(req),
    });

    next();
  }
}
