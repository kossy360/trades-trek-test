import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard.js';

export function Protected() {
  return UseGuards(JwtAuthGuard);
}
