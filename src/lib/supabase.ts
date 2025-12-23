import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Cake {
  id: string;
  name: string;
  name_bn: string;
  description: string;
  description_bn: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: string;
  is_trending: boolean;
  is_featured: boolean;
  rating: number;
  reviews_count: number;
  created_at: string;
  display_order: number;
}

export interface Category {
  id: string;
  name: string;
  name_bn: string;
  image_url: string;
  emoji: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image_url: string;
  rating: number;
  text: string;
  is_featured: boolean;
  created_at: string;
}

// Helper function to get public URL for images in storage bucket
export const getImageUrl = (bucketName: string, path: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
};

// Fetch trending cakes
export const getTrendingCakes = async (): Promise<Cake[]> => {
  const { data, error } = await supabase
    .from('cakes')
    .select('*')
    .eq('is_trending', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching trending cakes:', error);
    return [];
  }
  return data || [];
};

// Fetch featured cakes
export const getFeaturedCakes = async (): Promise<Cake[]> => {
  const { data, error } = await supabase
    .from('cakes')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching featured cakes:', error);
    return [];
  }
  return data || [];
};

// Fetch all cakes
export const getAllCakes = async (): Promise<Cake[]> => {
  const { data, error } = await supabase
    .from('cakes')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching cakes:', error);
    return [];
  }
  return data || [];
};

// Fetch categories
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
};

// Fetch testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data || [];
};
