import { SubCategory } from "./SubCategory";
export interface Category {
  categoryId: any;
  name: string;
  cratedAt: any;
  updatedAt: any;
  isDeleted: any;
  image: string;
  subCategories: SubCategory[];
}
