import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const NoAuth = () => SetMetadata(IS_PUBLIC, true);
