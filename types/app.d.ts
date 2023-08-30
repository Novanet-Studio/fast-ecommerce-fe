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

interface UserExtra {
  customerId: string;
}

type User = import('@nuxtjs/strapi/dist/runtime/types').StrapiUser & UserExtra;
type PaymentMethod = 'pago_movil' | 'trans_bofa' | 'zelle' | 'venmo';

enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
  None = '',
}

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
type CategoriesRequest = DataWrapper<CategoriesRequestData>;
type AddressRequest = DataWrapper<AddressRequestData>;
type CreateInvoiceRequest = DataWrapper<CreateInvoiceRequestData>;

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

interface CategoriesRequestData {
  categories: Categories;
}

interface AddressRequestData {
  addresses: Addresses;
}

interface CreateInvoiceRequestData {
  createInvoice: CreateInvoice;
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
type Categories = DataWrapper<CategoriesData[]>;
type Addresses = DataWrapper<AddressesData[]>;
type CreateInvoice = DataWrapper<InvoicesData>;

// =====================
// API DATA
// =====================
type ProductsData = StrapiDataWrapper<ProductAttributes>;
type InvoicesData = StrapiDataWrapper<InvoiceAtributes>;
type CategoriesData = StrapiDataWrapper<CategoryAttributes>;
type AddressesData = StrapiDataWrapper<AddressAttributes>;

// =====================
// DATA ATTRIBUTES
// =====================
interface ProductAttributes {
  name: string;
  description: string;
  images: Image[];
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
  user: User;
  shipment_address: AddressDetail;
  payment_method: string;
  payment_info: InvoicePaymentInfo[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryAttributes {
  name: string;
  products: ProductAttributes[];
}

interface AddressAttributes {
  address: any;
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

interface Category extends CategoryAttributes {
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
  id?: string;
  quantity: number;
  product: Product | string;
  // product_id: number;
  // product_name: string;
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

interface Image {
  id?: string;
  name: string;
  formats: Formats;
  alternativeText: string;
  url: string;
  caption?: string;
}

interface Formats {
  medium: ImageMetadata;
  small: ImageMetadata;
  thumbnail: ImageMetadata;
}

interface ImageMetadata {
  ext: string;
  url: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface BcvUsdResponse {
  name: string;
  pair: string;
  sources: {
    BCV: BCVSource;
  };
}

interface BCVSource {
  name: string;
  quote: string;
  last_retrieved: string;
}
