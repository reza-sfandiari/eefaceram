
export  interface  User {
    username: string;
    password: string;
  }

  // newUser
  export  interface  NewUser {
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
    name: string;
    lastname: string;
    id?: number;
    status?: boolean;
  }