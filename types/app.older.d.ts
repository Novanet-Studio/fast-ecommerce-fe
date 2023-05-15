// declare module '*.gql' {
//   import { DocumentNode } from 'graphql';
//   const Schema: DocumentNode;
//   export = Schema;
// }

// declare module 'vue3-tabs-component' {
//   import { Component } from 'vue';
//   const Tabs: Component;
//   const Tab: Component;

//   export { Tabs, Tab };
// }

// // Helper interfaces generics to reduce typings code
// interface DataWrapper<T> {
//   data: T;
// }

// interface StrapiDataWrapper<T> {
//   id?: string;
//   attributes?: T;
// }

// type CategoriesRequest = DataWrapper<CategoriesRequestData>;
// type InvoicesRequest = DataWrapper<InvoicesRequestData>;
// type ProductRequest = DataWrapper<ProductRequestData>;
// type LoginRequest = DataWrapper<LoginRequestData>;
// type RegisterRequest = DataWrapper<RegisterRequestData>;
// type CreateInvoiceRequest = DataWrapper<CreateInvoiceRequestData>;

// // API Request

// interface CategoriesRequestData {
//   categories: Categories;
// }

// interface InvoicesRequestData {
//   invoices: Invoices;
// }

// // API Content
// interface Categories {
//   data: CategoriesData[];
// }

// interface Invoices {
//   data: InvoicesData[];
// }

// interface Products {
//   data: ProductsData[];
// }

// // API Data
// interface CategoriesData {
//   id?: string;
//   attributes: string;
// }

// interface InvoicesData {
//   id?: string;
//   attributes: InvoiceAtributes;
// }

// interface ProductsData {
//   id?: string;
//   attributes: ProductAttributes;
// }

// // Data attributes
// interface CategoryAttributes {
//   name: string;
//   products: [];
// }

// interface ProductAttributes {}

// interface InvoiceAtributes {
//   paid: boolean;
//   amount: number;
//   products: ProductBuyed[];
//   payment_id: string;
//   order_id: string;
//   user_id: string;
//   shippingAddress: AddressDetail;
//   fullName: string;
//   cardType: string;
//   cardKind: string;
//   cardLast: string;
//   payment_method: string;
//   payment_info: InvoicePaymentInfo[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Mappeds
// interface CategoriesMapped {
//   id: string;
//   name: string;
//   products: ProductsMapped[];
// }

// interface ProductsMapped {
//   id: string;
//   category: Category;
//   description: string;
//   name: string;
//   image: Image[];
//   price: number;
//   sale_price: number;
// }

// interface InvoicesMapped extends InvoiceAtributes {
//   id: string;
// }

// interface InvoicePaymentInfo {
//   name: string;
//   email: string;
//   amount: string;
//   lastname: string;
//   confirmation: string;
//   payment_date: string;
// }

// interface CreateInvoiceResponse {
//   data: {
//     createInvoice: {
//       data: Invoice;
//     };
//   };
// }

// interface BCVSource {
//   name: string;
//   quote: string;
//   last_retrieved: string;
// }

// interface BcvUsdResponse {
//   name: string;
//   pair: string;
//   sources: {
//     BCV: BCVSource;
//   };
// }

// // Rest...

// interface Category {
//   id: string;
//   name: string;
// }

// interface Image {
//   id?: string;
//   name: string;
//   formats: Formats;
//   alternativeText: string;
//   url: string;
//   caption?: string;
// }

// interface Formats {
//   medium: ImageMetadata;
//   small: ImageMetadata;
//   thumbnail: ImageMetadata;
// }

// interface ImageMetadata {
//   ext: string;
//   url: string;
//   hash: string;
//   height: number;
//   mime: string;
//   name: string;
//   path?: string | null;
//   size: number;
//   width: number;
//   provider_metadata: ProviderMetadata;
// }

// interface ProviderMetadata {
//   public_id: string;
//   resource_type: string;
// }

// interface InvoiceTableDetail extends InvoiceAtributes {
//   id: string;
//   id_invoice_user: number;
//   date: string;
//   status: string;
// }

// // ------------------------------------------------------------

// type CartItem = {
//   id: string;
//   quantity: number;
//   price: number;
// };

// type User = {
//   id: string;
//   email: string;
//   username: string;
//   customerId: string;
//   blocked: boolean;
//   confirmed: boolean;
//   provider: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// type LoginResponse = {
//   data: {
//     login: {
//       jwt: string;
//       user: User;
//     };
//   };
// };

// type RegisterResponse = {
//   data: {
//     register: {
//       jwt: string;
//       user: User;
//     };
//   };
// };
// // type AddressType = 'billing' | 'shipping';

// interface ImageFormat {
//   ext: string;
//   url: string;
//   hash: string;
//   mime: string;
//   name: string;
//   path?: string | null;
//   size: number;
//   width: number;
//   height: number;
// }

// interface Format {
//   small: ImageFormat;
//   thumbnail: ImageFormat;
// }

// interface Image {
//   id: string;
//   attributes: {
//     name: string;
//     url: string;
//     alternativeText: string;
//     caption: string;
//     previewUrl: string;
//     formats: Format;
//   };
// }

// interface ProductBuyed {
//   id: string;
//   quantity: number;
//   id_product: number;
//   name_product: string;
// }

// interface AddressDetail {
//   home: string;
//   city: string;
//   phone: string;
//   address: string;
//   country: string;
//   zipCode: string;
// }

// // interface InvoiceDetail {
// //   paid: boolean;
// //   amount: number;
// //   products: ProductBuyed[];
// //   payment_id: string;
// //   order_id: string;
// //   user_id: string;
// //   shippingAddress: AddressDetail;
// //   fullName: string;
// //   cardType: string;
// //   cardKind: string;
// //   cardLast: string;
// //   createdAt?: Date;
// //   updatedAt?: Date;
// // }

// // interface InvoiceTableDetail extends InvoiceDetail {
// //   id: string;
// //   id_invoice_user: number;
// //   date: string;
// //   status: string;
// // }

// interface Product {
//   id: string;
//   attributes: {
//     name: string;
//     description: string;
//     price: number;
//     sale_price: number;
//     is_sale: boolean;
//     image: {
//       data: Image[];
//     };
//     category: {
//       data: Category;
//     };
//   };
// }

// interface Category {
//   id: string;
//   attributes: {
//     name: string;
//     products?: {
//       data: Product[];
//     };
//   };
// }

// interface Address {
//   id: string;
//   attributes: {
//     type: AddressType;
//     user_id: string;
//     address: AddressDetail;
//   };
// }

// interface InvoiceResponse {
//   data: {
//     id: string;
//     attributes: InvoiceDetail;
//   };
// }

// interface Invoice {
//   id: string;
//   attributes: InvoiceDetail;
// }

// interface ProductsResponse {
//   data: {
//     products: {
//       data: Product[];
//     };
//   };
// }

// interface CategoriesResponse {
//   data: {
//     categories: {
//       data: Category[];
//     };
//   };
// }

// interface AddressResponse {
//   data: {
//     addresses: {
//       data: Address[];
//     };
//   };
// }

// interface UpdateAddressResponse {
//   data: {
//     updateAddress: {
//       data: Address;
//     };
//   };
// }

// interface InvoicesResponse {
//   data: {
//     invoices: {
//       data: Invoice[];
//     };
//   };
// }
