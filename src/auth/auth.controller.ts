import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')    
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() { username, password }: LoginDto) {
      return this.authService.login(username, password);
    }

    @Post('register')
    @ApiOkResponse({ type: AuthEntity })
    register(@Body() { username, password }: RegisterDto) {
      return this.authService.register(username, password);
    }
}
