export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
  origin: string;
  moisture?: string;
  purity?: string;
  packaging: string;
  minOrder: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface QuoteRequest {
  restaurantName: string;
  contactName: string;
  phone: string;
  email: string;
  product: string;
  quantity: number;
  unit: string;
  notes?: string;
}
