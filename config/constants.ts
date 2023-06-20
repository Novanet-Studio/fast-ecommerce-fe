type ProductKey = InjectionKey<Product>;
type ProductDetailKey = InjectionKey<Ref<Product>>;

export const injectKeys = Object.freeze({
  product: Symbol('product') as ProductKey,
  productDetail: Symbol('productDetail') as ProductDetailKey,
});
