interface User {
  id: number;
  image: string | null;
  email: string;
  last_name: string;
  first_name: string;
  name: string | null;
  account_id: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  email_verified: number;
  previous_email: string | null;
  email_pre_change: string | null;
  email_user_limit: number;
  email_limit_time: number | null;
}


interface UserWithPassword extends User {
  password: string;
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
  expires: string;
  type: 'password' | 'email';
}

interface VerificationCode {
  id: number;
  email: string;
  code: string;
  expires: string;
  type: 'password' | 'email';
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand_id: number;
  stock: number;
  discount_price?: number; 
}

type Products = Product[];

interface SearchProductApi extends Product {
  brand_name: string;
  car_name: string
  car_year : number
}
interface SearchProduct extends Product {
  brandName: string;
  carName: string
  carYear: number
}

interface Brand {
  id: number;
  name: string;
  description: string;
  slogan: string;
}

type Brands = Brand[];

interface Model {
  id: number;
  name: string;
  description: string;
  year: number; 
}

type Models = Model[];

interface Modification {
  id: number;
  name: string;
}

type Modifications = Modifications[];

interface filterOption {
  id: number,
  name: string
  brand_id?: number,
  model_id?: number
}