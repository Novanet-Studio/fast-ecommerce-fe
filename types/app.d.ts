interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    sale_price: number;
  };
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export = Schema;
}
