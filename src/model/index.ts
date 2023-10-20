export interface IDictionary<T> {
  [Key: string]: T;
}

export interface IExtendedDialogProps {
  isOpen: boolean;
  closeModal: () => void;
}

export type toastType = "primary" | "secondary" | "error" | "info" | "success";

export type toast = {
  id: number;
  title: string;
  message: string;
  options: {
    type: toastType;
  };
};

export type placement = "center" | "top";

export type size = "standard" | "fit";

export type submenuItem = {
  to: string;
  label: string;
};

export type loginMethod = "otp" | "password";
