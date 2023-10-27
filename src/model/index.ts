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

export type measure_type = "KILOGRAM" | "GRAM";

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

export const MEASURE_TYPES: IDictionary<string> = {
  KILOGRAM: "کیلوگرم",
  GRAM: "گرم",
};
