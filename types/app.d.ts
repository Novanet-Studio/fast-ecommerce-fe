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

// =====================
// REQUEST DATA
// =====================

interface LoginRequestData {
  login: UserData;
}

interface RegisterRequestData {
  register: UserData;
}

// =====================
// API CONTENT
// =====================
interface UserData {
  jwt: string;
  user: User;
}

// =====================
// API CONTENT
// =====================

// =====================
// API DATA
// =====================

// =====================
// DATA ATTRIBUTES
// =====================

// =====================
// MAPPED DATA
// =====================
