export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export enum Role {
  ROLE_CLIENT = 'ROLE_CLIENT',
  ROLE_EMPLOYE = 'ROLE_EMPLOYE',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface DecodedToken {
  sub: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
