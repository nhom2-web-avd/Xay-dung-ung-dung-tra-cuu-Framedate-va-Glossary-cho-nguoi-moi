import type { UserRole } from '../../../entities/user.entity';
export declare class RegisterDto {
    username: string;
    password: string;
    role?: UserRole;
}
