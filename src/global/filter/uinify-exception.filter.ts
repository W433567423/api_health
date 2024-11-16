import { getInfoReq } from '@/global/helper/getInfoReq';
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export default class UnifyExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取当前执行上下文
    const res = ctx.getResponse<Response>(); // 获取响应对象
    const req = ctx.getRequest<Request>(); // 获取请求对象
    const status = exception.getStatus();

    // 记录日志（错误消息，错误码，请求信息等）
    this.logger.error(exception.message, {
      status,
      req: getInfoReq(req),
    });

    res
      .status(status >= 500 ? status : 200)
      .json({ code: status, msg: exception.message });
  }
}
