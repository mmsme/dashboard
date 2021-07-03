import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CKEditorModule } from "ng2-ckeditor";
import { EditorsModule } from "./../pages/editors/editors.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerComponent } from "./Seller.component";
import { ThemeModule } from "./../@theme/theme.module";
import {
  NbCardModule,
  NbMenuModule,
  NbStepperModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbAlertModule,
  NbToastrModule,
  NbBadgeModule,
  NbListModule,
  NbTreeGridModule,
  NbAccordionModule,
  NbIconModule,
  NbActionsModule,
} from "@nebular/theme";
import { SellerRoutingModule } from "./Seller.routing.module";

/**========================================================================
 *?                           My Components
 *========================================================================**/

/* -------------------------------- inventory ------------------------------- */
import { InventoryComponent } from "./Inventory/inventory/inventory.component";

/* --------------------------------- Product -------------------------------- */
import { ManageImagesComponent } from "./Product/manage-images/manage-images.component";
import { AddProductComponent } from "./Product/add-product/add-product.component";
import { ManageProductsComponent } from "./Product/manage-products/manage-products.component";

import { UpdateProductComponent } from "./Product/update-product/update-product.component";

/* ---------------------------------- Order --------------------------------- */
import { OrderComponent } from "./Order/Order/Order.component";

/* ------------------------------- Poromation ------------------------------- */
import { PoromationComponent } from "./Poromation/Poromation/Poromation.component";

/* --------------------------------- Reports -------------------------------- */
import { CatalogPerformanceComponent } from "./Reports/catalog-performance/catalog-performance.component";
import { SalesReportComponent } from "./Reports/sales-report/sales-report.component";
import { ProductService } from "../Services/Product/Product.service";
import { ProfileComponent } from "./Profile/Profile.component";




@NgModule({
  declarations: [
    SellerComponent,
    AddProductComponent,
    ManageImagesComponent,
    OrderComponent,
    PoromationComponent,
    CatalogPerformanceComponent,
    SalesReportComponent,
    ManageProductsComponent,
    UpdateProductComponent,
    InventoryComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    SellerRoutingModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    EditorsModule,
    CKEditorModule,
    FormsModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbToastrModule,
    NbBadgeModule,
    Ng2SmartTableModule,
    NbListModule,
    NbTreeGridModule,
    NbAccordionModule,
    NbIconModule,
    NbActionsModule,
  ],
  providers: [ProductService],
})
export class SellerModule {}
