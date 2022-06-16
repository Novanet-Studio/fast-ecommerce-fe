type User = {
  id: string;
  username: string;
  email: string;
};

type LoginResponse = {
  data: {
    login: {
      jwt: string;
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
