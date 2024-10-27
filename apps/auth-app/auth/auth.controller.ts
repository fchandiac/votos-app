import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../../libs/dto/user/sign-in.dto'; // DTO para iniciar sesión
import { CreateUserDto } from '../../libs/dto/user/create-user.dto'; // DTO para crear usuario
import { User } from '../../libs/entities/auth/user.entity'; // Ajusta la ruta según tu estructura
import { Response } from 'express';
import { ValidateUserDto } from 'apps/libs/dto/user/validate-user.dto';

@Controller('auth') // Define la ruta base para el controlador
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
    healthCheck(): string {
        return 'Auth service is up and running';
    }

  // Ruta para iniciar sesión
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Req() req: any, @Res() res: Response): Promise<Response> {
    const socketId = req.headers['socket-id']; // Obtiene el socketId del encabezado de la solicitud
    const user = await this.authService.signIn(dto, socketId);
 
    return res.json(user) // Retorna el usuario autenticado
  }

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response): Promise<User> {
    const newUser = await this.authService.registerUser(dto);
    return newUser // Retorna el nuevo usuario creado
  }

  @Post('validateUser')
  async validateUser(@Body() dto: ValidateUserDto): Promise<User | null> {
    const user = await this.authService.validateUser(dto)
    return user // Retorna el usuario si existe
  }

  // Otras rutas relacionadas con la autenticación pueden ir aquí...
}
