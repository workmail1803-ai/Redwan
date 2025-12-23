'use client';

import { useState, useEffect } from 'react';
import { supabase, Cake, getTrendingCakes } from '@/lib/supabase';

// Demo data for when Supabase is not configured
const demoCakes = [
  {
    id: '1',
    name: 'Chocolate Drip Cake',
    name_bn: 'চকলেট ড্রিপ কেক',
    description: 'Premium cake with chocolate drip and gold touch',
    description_bn: 'চকলেট ড্রিপ ও গোল্ড টাচ সহ প্রিমিয়াম কেক',
    price: 1500,
    original_price: 1800,
    image_url: '/cakes/chocolate-drip.jpg',
    category: 'chocolate',
    is_trending: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 128,
    created_at: new Date().toISOString(),
    display_order: 1,
  },
  {
    id: '2',
    name: 'Red Velvet Heart',
    name_bn: 'রেড ভেলভেট হার্ট',
    description: 'Heart shaped red velvet - perfect for loved ones',
    description_bn: 'হার্ট শেপ রেড ভেলভেট - প্রিয়জনের জন্য পারফেক্ট',
    price: 1800,
    original_price: 2200,
    image_url: '/cakes/red-velvet-heart.jpg',
    category: 'special',
    is_trending: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 156,
    created_at: new Date().toISOString(),
    display_order: 2,
  },
  {
    id: '3',
    name: 'Chocolate Flower',
    name_bn: 'চকলেট ফ্লাওয়ার',
    description: 'Chocolate glaze cake with white flower decoration',
    description_bn: 'সাদা ফুল ডেকোরেশন সহ চকলেট গ্লেজ কেক',
    price: 1600,
    original_price: 2000,
    image_url: '/cakes/chocolate-flower.jpg',
    category: 'chocolate',
    is_trending: true,
    is_featured: true,
    rating: 4.8,
    reviews_count: 112,
    created_at: new Date().toISOString(),
    display_order: 3,
  },
  {
    id: '4',
    name: 'Pistachio Green',
    name_bn: 'পিস্তা গ্রিন কেক',
    description: 'Pistachio flavored cake with Bengali text',
    description_bn: 'বাংলা লেখা সহ পিস্তা ফ্লেভার কেক',
    price: 1400,
    original_price: 1700,
    image_url: '/cakes/pistachio-green.jpg',
    category: 'birthday',
    is_trending: true,
    is_featured: true,
    rating: 4.7,
    reviews_count: 89,
    created_at: new Date().toISOString(),
    display_order: 4,
  },
];

export function useCakes() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [trendingCakes, setTrendingCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCakes() {
      try {
        // Check if Supabase is configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        
        if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
          // Use demo data
          setCakes(demoCakes);
          setTrendingCakes(demoCakes.filter(c => c.is_trending));
          setLoading(false);
          return;
        }

        // Fetch from Supabase
        const { data: allCakes, error: cakesError } = await supabase
          .from('cakes')
          .select('*')
          .order('display_order', { ascending: true });

        if (cakesError) {
          console.error('Supabase error:', cakesError);
          // Fallback to demo data
          setCakes(demoCakes);
          setTrendingCakes(demoCakes.filter(c => c.is_trending));
        } else if (allCakes && allCakes.length > 0) {
          setCakes(allCakes);
          setTrendingCakes(allCakes.filter(c => c.is_trending));
        } else {
          // No data in Supabase, use demo
          setCakes(demoCakes);
          setTrendingCakes(demoCakes.filter(c => c.is_trending));
        }
      } catch (err) {
        console.error('Error fetching cakes:', err);
        setError('Failed to load cakes');
        setCakes(demoCakes);
        setTrendingCakes(demoCakes.filter(c => c.is_trending));
      } finally {
        setLoading(false);
      }
    }

    fetchCakes();
  }, []);

  return { cakes, trendingCakes, loading, error };
}

export { demoCakes };
