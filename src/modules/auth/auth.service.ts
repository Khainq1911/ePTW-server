import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';

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
  

    const payload = { id: user.id, name: user.name, roleId: user.roleId, phone: user.phone };
  
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
  
}
