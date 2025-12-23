'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Placeholder cake images - admin can replace these via Supabase
const cakeImages = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80',
    'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=300&q=80',
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=300&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80',
    'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&q=80',
    'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=300&q=80',
    'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=300&q=80',
];

interface FloatingCake {
    id: number;
    x: number;
    y: number;
    z: number; // Depth layer (0-3)
    size: number;
    rotation: number;
    image: string;
    speed: number;
}

// Generate random floating cakes
const generateCakes = (count: number): FloatingCake[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 300, // Extended for scroll
        z: Math.floor(Math.random() * 4), // 0-3 depth layers
        size: 80 + Math.random() * 120,
        rotation: Math.random() * 360,
        image: cakeImages[i % cakeImages.length],
        speed: 0.2 + Math.random() * 0.8,
    }));
};

export default function FloatingCakesBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cakes, setCakes] = useState<FloatingCake[]>([]);
    const [isClient, setIsClient] = useState(false);

    const { scrollYProgress } = useScroll();

    useEffect(() => {
        setIsClient(true);
        setCakes(generateCakes(20));
    }, []);

    if (!isClient) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{
                perspective: '1000px',
                perspectiveOrigin: '50% 50%',
                zIndex: 0,
            }}
        >
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80 z-10" />

            {/* 3D Cake Layers */}
            {cakes.map((cake) => (
                <FloatingCakeItem
                    key={cake.id}
                    cake={cake}
                    scrollYProgress={scrollYProgress}
                />
            ))}

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        </div>
    );
}

function FloatingCakeItem({
    cake,
    scrollYProgress,
}: {
    cake: FloatingCake;
    scrollYProgress: any;
}) {
    // Different layers move at different speeds (parallax)
    const depthMultiplier = 1 - cake.z * 0.2;
    const yOffset = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -500 * cake.speed * depthMultiplier]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1, 1.1, 0.9]
    );

    const opacity = 0.3 + (3 - cake.z) * 0.2; // Closer = more visible
    const blur = cake.z * 2; // Further = more blur

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${cake.x}%`,
                top: `${cake.y}%`,
                y: yOffset,
                scale,
                width: cake.size,
                height: cake.size,
                zIndex: 4 - cake.z,
                transform: `translateZ(${-cake.z * 100}px) rotate(${cake.rotation}deg)`,
                filter: `blur(${blur}px)`,
                opacity,
            }}
            animate={{
                y: [0, -20, 0],
                rotate: [cake.rotation, cake.rotation + 5, cake.rotation],
            }}
            transition={{
                duration: 4 + cake.z,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <div className="relative w-full h-full">
                {/* Glow behind cake */}
                <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50"
                    style={{
                        background: `radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)`,
                    }}
                />
                {/* Cake image */}
                <img
                    src={cake.image}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                />
            </div>
        </motion.div>
    );
}
