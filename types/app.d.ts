// import type { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types';

declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export = Schema;
}

declare module 'vue3-tabs-component' {
  import { Component } from 'vue';
  const Tabs: Component;
  const Tab: Component;

  export { Tabs, Tab };
}

type User = import('@nuxtjs/strapi/dist/runtime/types').StrapiUser & {
  customerId: string;
};

enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
  None = '',
}

enum HttpsCallable {
  CreateCustomer = 'createCustomer',
  Payment = 'payment',
}

type HttpsCallableHelper = <T, U>(data: T) => U;

interface Pagination {
  total: number;
  pageCount: number;
}

interface Meta {
  pagination: Pagination;
}

// Helper interfaces generics to reduce typings code
interface DataWrapper<T> {
  data: T;
}

interface StrapiDataWrapper<T> {
  id?: string;
  attributes?: T;
}

type MetaInfo = { meta: Meta };

// =====================
// API REQUEST
// =====================

type LoginRequest = DataWrapper<LoginRequestData>;
type RegisterRequest = DataWrapper<RegisterRequestData>;
type ProductRequest = DataWrapper<ProductRequestData>;
type InvoicesRequest = DataWrapper<InvoicesRequestData>;

// =====================
// REQUEST DATA
// =====================

interface LoginRequestData {
  login: UserData;
}

interface RegisterRequestData {
  register: UserData;
}

interface ProductRequestData {
  products: Products;
}

interface InvoicesRequestData {
  invoices: Invoices;
}

// =====================
// API CONTENT
// =====================
interface UserData {
  jwt: string;
  user: User;
}

type Products = DataWrapper<ProductsData[]>;
type Invoices = DataWrapper<InvoicesData[]> & MetaInfo;
type InvoiceContent = DataWrapper<InvoicesData>;

// =====================
// API DATA
// =====================
type ProductsData = StrapiDataWrapper<ProductAttributes>;
type InvoicesData = StrapiDataWrapper<InvoiceAtributes>;

// =====================
// DATA ATTRIBUTES
// =====================
interface ProductAttributes {
  name: string;
  description: string;
  images: any;
  size: string;
  materials: string;
  price: number;
  category: CategoryAttributes;
}

interface InvoiceAtributes {
  paid: boolean;
  amount: number;
  products: ProductBuyed[];
  payment_id: string;
  order_id: string;
  shipment_address: AddressDetail;
  payment_method: string;
  payment_info: InvoicePaymentInfo[];
  createdAt?: Date;
  updatedAt?: Date;
}

// =====================
// MAPPED DATA
// =====================

interface Product extends ProductAttributes {
  id: string;
}

interface Invoice extends InvoiceAtributes {
  id: string;
}

// =====================
// REST
// =====================

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

interface ShippingInfo {
  email?: string;
  name?: string;
  lastName?: string;
  address?: string;
  home?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

interface ProductBuyed {
  id: string;
  quantity: number;
  product_id: number;
  product_name: string;
}

interface AddressDetail {
  home: string;
  city: string;
  phone: string;
  address: string;
  addressLine1?: string;
  country: string;
  zipCode: string;
}

interface InvoiceTableDetail extends InvoiceAtributes {
  id: string;
  id_invoice_user: number;
  date: string;
  status: string;
}

interface InvoicePaymentInfo {
  first_name: string;
  last_name: string;
  email: string;
  amount: string;
  confirmation_id: string;
  payment_date: string;
}
