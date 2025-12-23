# Sweet Delights BD - Premium Cake Shop 🎂

বাংলাদেশের সেরা কেক শপ - A premium cake business website for Bangladesh.

## Features ✨

- **Progressive Web App (PWA)** - Install on mobile for native-like experience
- **Mobile-First Design** - Optimized for mobile users in Bangladesh
- **Scroll Animations** - Beautiful parallax and reveal animations
- **Bengali Language** - Full Bengali/Bangla language support
- **WhatsApp Integration** - Quick order via WhatsApp
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized with Next.js 14

## Tech Stack 🛠️

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **PWA:** next-pwa
- **Icons:** React Icons
- **Language:** TypeScript

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project folder:
```bash
cd cake-shop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## PWA Setup 📱

The app is configured as a Progressive Web App. After building for production:

1. Deploy to a HTTPS server (required for PWA)
2. Users can install the app from their browser
3. Works offline after first visit

### Generate PWA Icons

Replace the placeholder icons in `/public/icons/` with your actual icons:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

You can use tools like [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) to generate all sizes.

## Customization 🎨

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- `primary` - Main pink/rose colors
- `cream` - Background color
- `chocolate` - Text colors
- `gold` - Accent color

### Content
- Update cake data in `FeaturedCakes.tsx`
- Update contact info in `Contact.tsx`
- Update testimonials in `Testimonials.tsx`
- Update gallery images in `Gallery.tsx`

### Images
Replace Unsplash placeholder images with your own cake photos for better performance and branding.

## Project Structure 📁

```
cake-shop/
├── public/
│   ├── icons/          # PWA icons
│   └── manifest.json   # PWA manifest
├── src/
│   ├── app/
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── FeaturedCakes.tsx
│       ├── Categories.tsx
│       ├── Gallery.tsx
│       ├── Testimonials.tsx
│       ├── OrderCTA.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       ├── FloatingWhatsApp.tsx
│       └── LoadingScreen.tsx
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Deployment 🌐

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## License 📄

MIT License - Feel free to use for your cake business!

---

Made with ❤️ for Bangladesh 🇧🇩
