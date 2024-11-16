import { type RequestHandler } from '@nestjs/common/interfaces';
import * as session from 'express-session';
export const SERVER_PORT = 8011;
export const sessionConfig: RequestHandler = session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
});
