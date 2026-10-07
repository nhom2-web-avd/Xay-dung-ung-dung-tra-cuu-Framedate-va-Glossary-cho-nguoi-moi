import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { UserRole } from '../../../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'new_user', description: 'Tên đăng nhập' })
  @IsNotEmpty({ message: 'Username is required.' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'secret123', description: 'Mật khẩu' })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ example: 'guest', enum: ['admin', 'guest'], description: 'Vai trò người dùng' })
  @IsOptional()
  @IsEnum(['admin', 'guest'])
  role?: UserRole;
}
