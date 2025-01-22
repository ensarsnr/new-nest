//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username
      }
    };
  }
  async register(username: string, password: string): Promise<AuthEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: username }
    });

    if (existingUser) {
      throw new UnauthorizedException('Bu kullanıcı adı zaten kullanılıyor');
    }

    const user = await this.prisma.user.create({
      data: { username, password },
    });
    return { 
      accessToken: this.jwtService.sign({ 
        userId: user.id,
        username: user.username 
      }),
      user: {
        id: user.id,
        username: user.username
      }
    };
  }
}
