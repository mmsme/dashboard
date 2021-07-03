import { NbMenuItem } from "@nebular/theme";
import { link } from "fs";
import { title } from "process";

export const Seller_Menu: NbMenuItem[] = [
  {
    title: "Inventories",
    icon: "shopping-bag-outline",
    link: "seller",
    home: true,
    children: [
      {
        title: "Inventory",
        link: "/seller/inventories",
      },
    ],
  },
  {
    title: "Products",
    icon: "cube-outline",
    link: "seller",
    home: true,
    children: [
      {
        title: "Add Product",
        link: "/seller/product/add",
      },
      {
        title: "Manage Product",
        link: "/seller/product/manage",
      },
      // {
      //   title: "Manage Product Images",
      //   link: "/seller/product/images",
      // },
    ],
  },
  {
    title: "Orders",
    icon: "shopping-cart-outline",
    link: "seller",
    home: true,
    children: [
      {
        title: "Orders",
        link: "/seller/orders",
      },
    ],
  },
  // {
  //   title: "Promotions",
  //   icon: "tv-outline",
  //   link: "seller",
  //   home: true,
  //   children: [
  //     {
  //       title: "Promotions",
  //       link: "/seller/promotion",
  //     },
  //   ],
  // },
  // {
  //   title: "Reports",
  //   icon: "file-text-outline",
  //   link: "seller",
  //   home: true,
  //   children: [
  //     {
  //       title: "Sales Reports",
  //       link: "/seller/reports/sales",
  //     },
  //     {
  //       title: "Catalog Performance",
  //       link: "/seller/reports/catalog_performance",
  //     },
  //   ],
  // },

  {
    title: "Settings",
    icon: "settings-2-outline",
    link: "seller",
    home: true,
    children: [
      {
        title: "Profile",
        link: "/seller/profile",
      },
    ],
  },
];
