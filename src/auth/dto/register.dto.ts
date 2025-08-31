import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsDateString
} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
