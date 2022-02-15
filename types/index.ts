export interface ISKUs {
  id: number;
  sku: string;
  product_name: string;
  qty: number;
  price: number;
  unit: string;
  image: null;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface Data {
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}
export interface IRegisterSuccess {
  success: boolean;
  message: string;
  data: Data;
}
