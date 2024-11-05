import { Controller } from '@nestjs/common';
import { ReviewerService } from './reviewer.service';

@Controller('reviewer')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) {}
}
