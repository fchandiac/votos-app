'use server';
const authUrl = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL;

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  isOnline: boolean;
  lastConnected: Date;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: any[];
}

export const login = async (email: string, password: string) => {
  const response = await fetch(`${authUrl}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const validateUser = async (email: string) => {
  const response = await fetch(`${authUrl}/auth/validateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const findOneById = async (id: number): Promise<UserType> => {
  let userId = id;
  if (id === 0 || isNaN(id) || !Number.isInteger(id) || id < 0 || id === null) {
    userId = 0;
  }

  
  const response = await fetch(`${authUrl}/users/findOneById?id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (response.status !== 200) {
    console.error('Error al buscar el usuario por ID:', response.status);
    const defaultUser: UserType = {
      id: 0, // Asegúrate de definir un ID o cualquier otro valor por defecto que tenga sentido
      name: 'Sin Apoderado',
      email: 'desconocido@ejemplo.com',
      password: '', // O el valor por defecto que necesites
      isOnline: false,
      lastConnected: new Date(), // O un valor adecuado
      role: 'invited', // Ajusta según tu lógica
      createdAt: new Date(),
      updatedAt: new Date(),
      sessions: [],
    };
    return defaultUser;
  }

  return response.json();
};


// Obtener todos los usuarios
// @Get()
// async findAllUsers(): Promise<User[]> {
//   return this.userService.findAllUsers();
// }

export const findAllUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${authUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (response.status !== 200) {
    console.error('Error al buscar los usuarios:', response.status);
    return [];
  }

  return response.json();
};


// @Post('/findBySocketId')
// async findUserBySocketId(@Query('socketId') socketId: string): Promise<User> {
//   return this.userService.findOneBySocketId(socketId);
// }

export const findUserBySocketId = async (socketId: string): Promise<UserType> => {
  const response = await fetch(`${authUrl}/users/findBySocketId?socketId=${socketId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  return response.json();
}
