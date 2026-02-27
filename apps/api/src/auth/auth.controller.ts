import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
    @ApiProperty({ example: '+919876543210' })
    @IsString() @IsNotEmpty()
    phone: string;
}

export class VerifyOtpDto {
    @ApiProperty({ example: '+919876543210' })
    @IsString() @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: '123456' })
    @IsString() @IsNotEmpty()
    idToken: string; // Firebase ID token from client after phone auth
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('verify')
    @HttpCode(200)
    @ApiOperation({ summary: 'Verify Firebase Phone Auth ID token & return JWT' })
    async verify(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyFirebaseToken(dto.idToken);
    }
}
