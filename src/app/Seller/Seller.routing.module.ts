import { InventoryComponent } from "./Inventory/inventory/inventory.component";
import { ManageProductsComponent } from "./Product/manage-products/manage-products.component";
import { CatalogPerformanceComponent } from "./Reports/catalog-performance/catalog-performance.component";
import { SalesReportComponent } from "./Reports/sales-report/sales-report.component";
import { PoromationComponent } from "./Poromation/Poromation/Poromation.component";
import { OrderComponent } from "./Order/Order/Order.component";
import { ManageImagesComponent } from "./Product/manage-images/manage-images.component";
import { AddProductComponent } from "./Product/add-product/add-product.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SellerComponent } from "./Seller.component";
import { UpdateProductComponent } from "./Product/update-product/update-product.component";
import { ProfileComponent } from "./Profile/Profile.component";

const routes: Routes = [
  {
    path: "",
    component: SellerComponent,
    children: [
      /* -------------------------------- inventory ------------------------------- */
      { path: "inventories", component: InventoryComponent },

      /* ------------------------------ Product Paths ----------------------------- */
      { path: "product/add", component: AddProductComponent },
      { path: "product/manage", component: ManageProductsComponent },
      { path: "product/images", component: ManageImagesComponent },
      {
        path: "product/update/:id",
        component: UpdateProductComponent,
      },

      /* --------------------------------- Orders --------------------------------- */
      {
        path: "orders",
        component: OrderComponent,
      },

      /* ------------------------------- Promotion ------------------------------- */
      {
        path: "promotion",
        component: PoromationComponent,
      },

      /* --------------------------------- Reports -------------------------------- */
      {
        path: "reports/sales",
        component: SalesReportComponent,
      },
      {
        path: "reports/catalog_performance",
        component: CatalogPerformanceComponent,
      },

      /* --------------------------------- profile -------------------------------- */
      {
        path:"profile",
        component: ProfileComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
