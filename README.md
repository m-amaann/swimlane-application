This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


##  Features

- **Pixel-Perfect UI**: Recreated from Figma design with exact specifications
- **Responsive Design**: Optimized for desktop and mobile (768px+)
- **Drag & Drop**: task movement between swimlanes
- **Search**: filtering as you type
- **UI Component**: Ant Design components with Tailwind CSS
- **Type Safety**: Full TypeScript implementation


## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Icons**: Ant Design Icons


## 📁 Project Structure

```
src/
├── pages/          # Next.js pages
├── components/     # Reusable components
├── layout/         # Layout components
├── state/          # Zustand stores
├── data/           # Mock data
├── utils/          # Utility functions
└── types/          # TypeScript types
```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
