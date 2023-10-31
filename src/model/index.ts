export interface IDictionary<T> {
  [Key: string]: T;
}

export interface IExtendedDialogProps {
  isOpen: boolean;
  closeModal: () => void;
}

export type placement = "center" | "top";

export type size = "standard" | "fit";

export type login_method = "otp" | "password";

export type measure_type = "KILOGRAM" | "GRAM";

export type wallet_transaction_type = "deposit" | "withdraw";

export type ticket_type = "new" | "processing" | "closed";

export type user_roles = "CUSTOMER" | "ADMIN";

export type category = {
  id: number;
  name: string;
  image: string;
};

export type brand = {
  id: number;
  name: string;
  image: string;
};

export type product_price = {
  discount_price: number;
  id: number;
  measure_type: measure_type;
  price: number;
  product: number;
  tax: number;
  weight: number;
  quantity: number;
};

export type listOption = {
  id: number | string;
  label: string;
};

export type product = {
  id: number;
  product_price: product_price[];
  inventory: number;
  name: string;
  description: string;
  type: string;
  image: string;
  is_suggested: boolean;
  category: category;
  brand: number;
};

export type cart_item = {
  id: number;
  category_name: string;
  quantity: number;
  cart: number;
  product_price: {
    id: number;
    weight: number;
    measure_type: measure_type;
    price: number;
    discount_price: number;
    tax: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
    quantity: number;
  };
};

export type wallet_transaction = {
  id: number;
  amount: number;
  type: wallet_transaction_type;
  description: string;
  created_date: string;
  modified_date: string;
  customer: number;
};

export type ticket = {
  id: number;
  new_massage: 0;
  status: ticket_type;
  title: string;
  message: string;
  file: string;
  is_admin_ticket: boolean;
  created_at: string;
};

export type ticket_reply = {
  created_at: string;
  file: string;
  id: number;
  is_admin_response: boolean;
  is_seen: boolean;
  message: string;
};

export const TICKET_STATUS_TYPE: IDictionary<string> = {
  new: "جدید",
  processing: "درحال بررسی",
  closed: "بسته شده",
};

export const WALLET_TRANSACTION_TYPE: IDictionary<string> = {
  deposit: "واریز",
  withdraw: "برداشت",
};

export const MEASURE_TYPES: IDictionary<string> = {
  KILOGRAM: "کیلوگرم",
  GRAM: "گرم",
};
