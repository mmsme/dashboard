import { SubCategory } from "./SubCategory";
import { Promotion } from "./Promotion";
export interface Product {
  productId: any;
  productName: string;
  description: string;
  details: string;
  manufacture: string;
  size: any;
  color: string;
  quantity: number;
  Brand: string;
  VerifiedBrandId: any;
  weight: number;
  brandId: any;
  productImages: string[];
  quantitySealed: any;
  price: number;
  rangeDate: any;
  CreatedAt: any;
  UpdateAt: any;
  subCategotyId: any;
  subCategory: SubCategory;
  promotionId: any;
  promotions: Promotion[];
  isdeletedBySeller: boolean;
  isdeletedBySpoify: boolean;
  reviews: any;
  views: any;
  inventoryProducts: any;
  discount: number;
  rate: any;
  active: boolean;
}