export type TShowPassword = {
  currentPassword?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

export type TPagination = {
  page: number;
  limit: number;
};

export type TMenuState = {
  anchorEl: HTMLElement | null;
  open: boolean;
  context?: any;
};
