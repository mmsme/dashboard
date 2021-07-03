import { Status } from "./Status.enum";
export interface Promotion {
  Id: any;
  ProductID: any;
  Description: string;
  Image: string;
  SellerId: any;
  Seller: any;
  Status: Status;
  Discount: number;
  Products: any;
}
