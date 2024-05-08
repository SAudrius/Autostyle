interface User {
  id: number;
  image: string | null;
  email: string;
  last_name: string;
  first_name: string;
  name: string | null;
  account_id: string | null;
  password: string;
}

interface GoogleUser {
  first_name: string;
  last_name: string;
  email: string;
}
