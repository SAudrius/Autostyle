interface User {
  id: number;
  image: string | null;
  email: string;
  last_name: string;
  first_name: string;
  name: string | null;
  account_id: string | null;
  password: string;
  email_verified: number;
}

interface GoogleUser {
  first_name: string;
  last_name: string;
  email: string;
}

interface JwtData {
  userId: string;
  iat: string;
  exp: string;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
}

interface UserDetailsApi {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  city: string;
  address: string;
}

interface VerificationToken {
  id: number;
  email: string;
  token: string;
  expires:string;
  type: 'password' | 'email';
}