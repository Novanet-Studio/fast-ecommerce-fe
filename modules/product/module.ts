import path from "path";
import { defineNuxtModule, extendPages } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "product-module",
    configKey: "product-module",
  },
  setup() {
    extendPages((pages) => {
      pages.push({
        name: "Product",
        path: "/product",
        file: path.resolve(__dirname, "./pages/Product.vue"),
      });
    });
  },
});
