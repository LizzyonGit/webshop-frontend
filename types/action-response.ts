export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export type SignInEmailAction = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  userRole?: string | undefined | null;
};
