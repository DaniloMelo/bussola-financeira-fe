export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  sub: string;
  roles: string[];
  jti: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};
