export type SnackbarState = {
  open: boolean;
  color: "success" | "error" | "info" | "warning";
  message: string;
};

export type MenuState = {
  anchorEl: HTMLElement | null;
  open: boolean;
};

export type PaginationState = {
  page: number;
  limit: number;
};
