export interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  distance: string; // e.g., "150m"
  imageUrl: string;
  endTime: string; // e.g., "19:30"
  tags: string[];
}

export interface ClassSession {
  id: string;
  name: string;
  room: string;
  time: string; // e.g., "10:00 - 12:00"
  day: string;
}

export interface SustainabilityMetric {
  label: string;
  value: number;
  unit: string;
  change: number; // Percentage change
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  type: 'general' | 'promo' | 'urgent';
}

export enum Tab {
  HOME = 'home',
  FOOD = 'food',
  SCHEDULE = 'schedule',
  WALLET = 'wallet',
  PROFILE = 'profile',
}
