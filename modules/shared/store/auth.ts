import { defineStore } from 'pinia';

type User = {
  id?: number | string;
  email: string;
  username: string;
  password?: string;
  customerId?: string;
};

// Mockup
const users: User[] = [
  {
    id: 1,
    username: 'dave136',
    password: '123456',
    email: 'davejs136@gmail.com',
  },
];

export const useAuth = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    token: '',
    user: {
      id: '',
      email: '',
      username: '',
      customerId: '',
    },
  }),
  actions: {
    login({ username, password }: User) {
      // Mockup
      const findUser = users.find(
        (dbuser) => dbuser.username === username && dbuser.password === password
      );

      if (!findUser) {
        this.isLoggedIn = false;
        return { error: 'Username or password are incorrect' };
      }

      this.isLoggedIn = true;
      this.user = findUser;
      return { message: 'User logged in successfully' };
    },
    createUser(user: User) {
      const existUser = users.find(
        (dbuser) =>
          dbuser.username === user.username ||
          (dbuser.password === user.email && user.email)
      );

      if (existUser) {
        return { error: 'User already exists' };
      }

      users.push(user);
    },
  },
  persist: true,
});
