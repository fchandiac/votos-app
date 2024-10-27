'use server';
const tablesUrl = process.env.NEXT_PUBLIC_TABLES_BACKEND_URL;
import { UserType, findOneById } from './auth';
import { auth } from '@/auth';
import { validateUser } from './auth';

const defaultUser: UserType = {
  id: 0,
  name: 'Sin apoderado',
  email: 'no_email@ejemplo.com',
  password: '', // No es recomendable mostrar la contraseña por razones de seguridad
  isOnline: false,
  lastConnected: new Date(0), // Representa una fecha inicial
  role: 'invitado', // O cualquier rol por defecto que consideres apropiado
  createdAt: new Date(0),
  updatedAt: new Date(0),
  sessions: [],
};

interface PlaceType {
  id: string;
  name: string;
  address: string;
}

export interface TableType {
  id: number;
  number: number;
  userId: number | null;
  ojeda: number;
  castro: number;
  abasolo: number;
  blanks: number;
  nulls: number;
  place: PlaceType;
  user: UserType;
}

export interface UpdateVotesProps {
  id: number;
  ojeda: number;
  castro: number;
  abasolo: number;
  blanks: number;
  nulls: number;
}

export const findAllTables = async (searchTerm: string) => {
  const tablesResponse = await fetch(
    `${tablesUrl}/tables?searchTerm=${searchTerm}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const tables: TableType[] = await tablesResponse.json();

  const userPromises = tables.map(async (table: TableType) => {
    // Intentamos encontrar el usuario por su ID
    try {
      const userResponse = await findOneById(table.userId ?? 0);

      // Verificamos si la respuesta es un error (no OK)
      const user: UserType = userResponse as UserType;
      return { ...table, user }; // Devuelve una nueva tabla con el usuario agregado
    } catch (error) {
      // Si hay un error al buscar el usuario, usamos un usuario por defecto

      return { ...table, user: defaultUser }; // Devuelve una nueva tabla con el usuario por defecto
    }
  });

  // Espera a que todas las promesas se resuelvan
  const updatedTables = await Promise.all(userPromises);

  return updatedTables; // Devuelve las tablas actualizadas
};

export const findAllByUser = async (): Promise<TableType[]> => {
  const session = await auth();
  //@ts-ignore
  const email = session.user.email;
  //@ts-ignore
  const userResponse = await validateUser(email);
  const user: UserType = userResponse as UserType;

  const tablesResponse = await fetch(
    `${tablesUrl}/tables/findAllByUser?userId=${user.id}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const tables: TableType[] = await tablesResponse.json();
  return tables;
};

export const updateVotes = async ({
  id,
  ojeda,
  castro,
  abasolo,
  nulls,
  blanks,
}: UpdateVotesProps) => {
  //   const session = await auth();
  //   //@ts-ignore
  //   const email = session.user.email;
  //   //@ts-ignore
  //   const userResponse = await validateUser(email);
  //   const user: UserType = userResponse as UserType;

  const response = await fetch(`${tablesUrl}/tables/updateVotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ojeda,
      castro,
      abasolo,
      nulls,
      blanks,
    }),
  });

  console.log('response', response);

  return response.json();
};


export interface TotalsType {
  ojeda: number;
  castro: number;
  abasolo: number;
  blanks: number;
  nulls: number;
  totalEmitted: number;
  totalValidated: number;
  tablesUniverse: number;
  votesUniverse: number;
  participationPercentage: string;
}

export const getTotals = async (): Promise<TotalsType> => {
  const response = await fetch(`${tablesUrl}/tables/totals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  return response.json();
};


// async updateUser(dto: UpdateUserDto): Promise<void> {
//   const { id, userId } = dto;


export const updateUser = async (id: number, userId: number) => {
  const response = await fetch(`${tablesUrl}/tables/updateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, userId }),
    cache: 'no-store',
  });
  return response.json();
}

export const resetTable = async (id: number) => {
  const response = await fetch(`${tablesUrl}/tables/resetTable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    cache: 'no-store',
  });

  return response.json();
}