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

export type contract_types = "REAL" | "JURIDICAL";

export type status_types = "success" | "pending" | "failed";

export type notification_types = "USER" | "ORDER" | "PRODUCT" | "NOTICE";

export type user_type = "ALL" | "JURIDICAL" | "REAL";

export type card_types =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info"
  | "danger";

export type category = {
  id: number;
  name: string;
  image: string;
  is_active: boolean;
  parent_category: number | null;
  categories?: category[];
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
  inventory: number;
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
    inventory: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
    quantity: number;
  };
};

export type order_item = {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
  discount_amount: number;
  tax_amount: number;
  order: number;
  product: product | number;
  product_price: product_price;
};

export type wallet_transaction = {
  id: number;
  amount: number;
  type: wallet_transaction_type;
  description: string;
  created_date: string;
  modified_date: string;
  customer: number;
  status: status_types;
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

export type carousel = {
  id: number;
  mobile_banner: string;
  desktop_banner: string;
  url: string;
};

export type order_type = "completed" | "pending" | "canceled" | "need_payment";

export type order = {
  id: number;
  order_item: order_item[];
  payment: {
    id: number;
    status: string;
    amount: number;
    wallet_transaction: number | null;
    offline_transaction: number | null;
    online_transaction: number | null;
  };
  status: order_type;
  need_tax: boolean;
  created_date: string;
};

export type notification = {
  id: number;
  title: string;
  message: string;
  file: string | null;
  type: notification_types;
  created_at: string;
  user_type: user_type;
};

export const ORDER_TYPES: IDictionary<string> = {
  completed: "موفق",
  pending: "درحال بررسی",
  canceled: "ناموفق",
  need_payment: "نیاز به پرداخت",
};

export const PAYMENT_TYPE: IDictionary<string> = {
  offline_transaction: "افلاین",
  online_transaction: "درگاه",
  wallet_transaction: "کیف پول",
};

export const TICKET_STATUS_TYPE: IDictionary<string> = {
  new: "جدید",
  processing: "درحال بررسی",
  closed: "بسته شده",
};

export const STATUS_TYPE: IDictionary<string> = {
  success: "موفق",
  pending: "در حال بررسی",
  failed: "ناموفق",
};

export const WALLET_TRANSACTION_TYPE: IDictionary<string> = {
  deposit: "واریز",
  withdraw: "برداشت",
};

export const MEASURE_TYPES: IDictionary<string> = {
  KILOGRAM: "کیلوگرم",
  GRAM: "گرم",
};

export const CONTRACT_TYPES: IDictionary<string> = {
  REAL: "حقیقی",
  JURIDICAL: "حقوقی",
};

export const NOTIFICATION_VARIANT: IDictionary<string> = {
  USER: "bg-warning text-grey-800",
  ORDER: "bg-primary text-white",
  NOTICE: "bg-danger text-white",
  PRODUCT: "bg-secondary text-white",
};

export const IS_ACTIVE: IDictionary<string> = {
  true: "فعال",
  false: "غیرفعال",
};

export const USER_TYPES: IDictionary<string> = {
  ALL: "همه",
  REAL: "حقیقی",
  JURIDICAL: "حقوقی",
};

export const NOTIFICATION_TYPE_DB: IDictionary<string> = {
  USER: "فعالیت کاربر",
  ORDER: "فرایند سفارش",
  PRODUCT: "اطلاعات محصول",
  NOTICE: "اعلانات کاربر",
};
