import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}