type CartItem = {
  id: string;
  quantity: number;
  price: number;
};

type User = {
  id: string;
  email: string;
  username: string;
  customerId: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
};

type LoginResponse = {
  data: {
    login: {
      jwt: string;
      user: User;
    };
  };
};

type RegisterResponse = {
  data: {
    register: {
      jwt: string;
      user: User;
    };
  };
};
// type AddressType = 'billing' | 'shipping';

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  height: number;
}

interface Format {
  small: ImageFormat;
  thumbnail: ImageFormat;
}

interface Image {
  id: string;
  attributes: {
    name: string;
    url: string;
    alternativeText: string;
    caption: string;
    previewUrl: string;
    formats: Format;
  };
}

interface ProductBuyed {
  id: string;
  quantity: number;
  id_product: number;
  name_product: string;
}

interface AddressDetail {
  home: string;
  city: string;
  phone: string;
  address: string;
  addressLine1?: string;
  locality?: string;
  country: string;
  zipCode: string;
}

interface Product {
  id: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    sale_price: number;
    is_sale: boolean;
    image: {
      data: Image[];
    };
    category: {
      data: Category;
    };
  };
}

interface Category {
  id: string;
  attributes: {
    name: string;
    products?: {
      data: Product[];
    };
  };
}

interface Address {
  id: string;
  attributes: {
    type: AddressType;
    user_id: string;
    address: AddressDetail;
  };
}

interface InvoiceResponse {
  data: {
    id: string;
    attributes: InvoiceDetail;
  };
}

interface Invoice {
  id: string;
  attributes: InvoiceDetail;
}

interface ProductsResponse {
  data: {
    products: {
      data: Product[];
    };
  };
}

interface CategoriesResponse {
  data: {
    categories: {
      data: Category[];
    };
  };
}

interface AddressResponse {
  data: {
    addresses: {
      data: Address[];
    };
  };
}

interface UpdateAddressResponse {
  data: {
    updateAddress: {
      data: Address;
    };
  };
}

interface InvoicesResponse {
  data: {
    invoices: {
      data: Invoice[];
    };
  };
}
