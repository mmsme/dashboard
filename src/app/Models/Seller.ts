import { Inventory } from "./Inventory";
import { Promotion } from "./Promotion";

export interface Seller {
  sellerId: any;
  isdeleted: boolean;
  inventories: Inventory[];
  promotions: Promotion[];
  nationalCard: string;
  contract: string;
  taxCard: string;
  commercialRegistryCard: string;
  storeName: string;
  applicationUser: any;
}
