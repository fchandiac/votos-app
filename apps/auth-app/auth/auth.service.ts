import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../libs/entities/auth/user.entity'; // Ajusta la ruta según tu estructura
import { SignInDto } from '../../libs/dto/user/sign-in.dto'; // DTO para iniciar sesión
import { CreateUserDto } from '../../libs/dto/user/create-user.dto'; // DTO para crear usuario
import { ValidateUserDto } from 'apps/libs/dto/user/validate-user.dto';
import { SessionService } from '../session/session.service'; // Importa el servicio de sesión
import { UserService } from '../user/user.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  // Función para validar si el usuario existe
  async validateUser(dto: ValidateUserDto): Promise<User> {
    const { email } = dto;
    const user = await this.userService.findUserByMail({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  // Método para iniciar sesión
  async signIn(dto: SignInDto, socketId: string): Promise<User> {
    const { email, password } = dto;

    // Usa la nueva función validateUser
    const user = await this.validateUser({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verifica la contraseña (debes implementar tu propia lógica para validarla sin bcrypt)
    const isPasswordValid = this.checkPassword(password, user.password); // Implementa esta función

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Crear una nueva sesión para el usuario
    // try {
    //   await this.sessionService.createSession(user.id, socketId); // Crea una nueva sesión
    // } catch (error) {
    //   if (error instanceof QueryFailedError) {
    //     // Maneja el error de entrada duplicada
    //     if (error.driverError && error.driverError.code === 'ER_DUP_ENTRY') {
    //       throw new ConflictException(
    //         'Ya existe una sesión activa para este usuario.',
    //       );
    //     }
    //   }
    //   // Lanza cualquier otro error que no esté manejado
    //   throw error;
    // }

    return user; // Retorna el usuario si la autenticación es exitosa
  }

  async registerUser(dto: CreateUserDto): Promise<User> {
    const { email } = dto;
    const userExists = await this.validateUser({ email });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    // Hashea la contraseña antes de guardar el usuario
    const hashedPassword = this.hashPassword(dto.password); // Implementa esta función
    const newUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return newUser; // Guarda el nuevo usuario en la base de datos
  }

  // Implementa una función para validar contraseñas
  private checkPassword(inputPassword: string, storedPassword: string): boolean {
    // Aquí puedes implementar la lógica para verificar la contraseña
    // por ejemplo, comparándola directamente si no estás usando hash
    return inputPassword === storedPassword; // Ejemplo simplista
  }

  // Implementa una función para hashear contraseñas (puedes usar otra librería o método)
  private hashPassword(password: string): string {
    // Implementa la lógica para hashear la contraseña aquí
    // Por ejemplo, podrías usar una función que simplemente retorne la contraseña
    return password; // Esto es solo un ejemplo, no es seguro
  }
}
