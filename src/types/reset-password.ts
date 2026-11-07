export type RequestResetPasswordInput = {
  email: string;
};

export type ResetPasswordPublicInput = {
  email: string;
  rawToken: string;
  password: string;
  confirmPassword: string;
};
