import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import 'dotenv/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);
    const registerUser = { ...registerDto, password: hashPassword };

    await this.userRepository.save(registerUser);

    return { status: 'Success!' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: [{ phone: username }, { email: username }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      phone: user.phone,
    };

    return this.generateToken(payload);
  }

  private async generateToken(payload: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    phone: string;
  }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '1d',
    });

    await this.userRepository.update(
      { email: payload.email },
      { refreshToken: refreshToken },
    );
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this.userRepository.findOneBy({
        email: verifyToken.email,
        refreshToken,
      });

      if (user) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          phone: user.phone,
        };
        return this.generateToken(payload);
      } else {
        throw new HttpException(
          'Refresh Token is not valid!',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        'Refresh Token is not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}