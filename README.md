# 🚀 Carleton Cabarrus - Professional Portfolio & Online Resume

A modern, performant, and fully responsive online resume built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time contact form, database integration, and beautiful animations.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)

## ✨ Features

### 🎨 Design & UX
- **Modern Glass-morphism Design** - Beautiful frosted glass effects with backdrop filters
- **Smooth Animations** - Engaging micro-interactions and scroll animations
- **Fully Responsive** - Optimized for all devices from mobile to 4K displays
- **Dark Mode Support** - Respects user's system preferences
- **Accessibility First** - WCAG compliant with proper ARIA labels and keyboard navigation

### 🛠 Technical Features
- **Server-Side Rendering** - Lightning fast initial page loads with Next.js SSR
- **Contact Form Integration** - Real-time form submission with Zapier webhook integration
- **Database Storage** - PostgreSQL database for contact form submissions using Drizzle ORM
- **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- **Performance Optimized** - 95+ Lighthouse score with optimized images and code splitting
- **Type Safe** - Full TypeScript implementation with Zod validation

### 📊 Sections
- **Interactive Hero** - Eye-catching introduction with social links
- **Projects Showcase** - Featured projects with metrics and technologies
- **Experience Timeline** - Visual timeline of professional experience
- **Skills Matrix** - Categorized skills with proficiency indicators
- **Contact Form** - Validated contact form with real-time feedback
- **Downloadable Resume** - PDF resume download option

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for contact form)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/carletoncabarrus/carleton-online-resume.git
cd carleton-online-resume
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="your-postgresql-connection-string"
ZAPIER_WEBHOOK_URL="your-zapier-webhook-url"
```

4. **Set up the database**
```bash
npm run db:push
# or for migrations
npm run db:migrate
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your resume.

## 📁 Project Structure

```
carleton-online-resume/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles with animations
│   ├── layout.tsx         # Root layout with SEO metadata
│   └── page.tsx           # Home page (main resume)
├── lib/                   # Utility functions
│   ├── db.ts             # Database connection
│   └── db/
│       └── schema.ts     # Drizzle schema definitions
├── public/               # Static assets
│   └── CarletonCabarrus_Resume.pdf
├── .env.example          # Environment variables template
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Update Personal Information
Edit `app/page.tsx` to update:
- Name and title
- Contact information
- Social media links
- Experience details
- Projects
- Skills

### Modify Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Color scheme uses Tailwind's indigo and purple gradients

### Add New Sections
1. Create new components in `app/components/`
2. Import and use in `app/page.tsx`
3. Maintain consistent styling with existing sections

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Configure environment variables
- Deploy!

3. **Set Environment Variables in Vercel**
- Go to Project Settings > Environment Variables
- Add `DATABASE_URL` and `ZAPIER_WEBHOOK_URL`
- Redeploy to apply changes

### Database Setup (Vercel Postgres)
1. Add Vercel Postgres to your project
2. Copy the connection string to `DATABASE_URL`
3. Run migrations: `npm run db:push`

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 2s on 3G
- **Time to Interactive**: < 3s
- **SEO Score**: 100/100

## 🛠 Tech Stack

- **Framework**: Next.js 14.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Database**: PostgreSQL with Drizzle ORM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Radix UI Icons
- **Deployment**: Vercel
- **Webhooks**: Zapier Integration

## 📝 Environment Variables

```env
# Required
DATABASE_URL=             # PostgreSQL connection string
ZAPIER_WEBHOOK_URL=      # Zapier webhook for notifications

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=  # Google Analytics
NODE_ENV=                       # development | production
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` is correctly set
- Check if database is accessible
- Verify SSL settings in connection string

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

### Contact Form Not Working
- Verify Zapier webhook URL
- Check browser console for errors
- Ensure database tables are created

## 📄 License

MIT License - feel free to use this template for your own resume!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

**Carleton Cabarrus**
- Email: carletoncabarrus@gmail.com
- LinkedIn: [linkedin.com/in/carleton-cabarrus-jr](https://www.linkedin.com/in/carleton-cabarrus-jr/)
- GitHub: [github.com/carletoncabarrus](https://github.com/carletoncabarrus)

---

Built with ❤️ using Next.js and deployed on Vercel