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
