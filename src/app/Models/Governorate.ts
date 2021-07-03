import { Order } from "./Order";

export interface Governorate {
  governorateId: any;
  governorateName: string;
  shippingValue: number;
  duration: number;
  isdeleted: boolean;
  carts: Order[];
}
