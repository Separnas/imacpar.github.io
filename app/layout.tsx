
// app/layout.tsx
import './globals.css';
import PwaRegister from '../components/PwaRegister';

export const metadata = {
  title: 'Min Dag ✨',
  description: 'Din personliga schemaläggare',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <html lang="sv">
      <head>
        <link rel="manifest" href={`${base}/manifest.json`} />
        <link rel="apple-touch-icon" href={`${base}/icons/icon-180.png`} />
        <link rel="icon" href={`${base}/favicon.ico`} sizes="any" />
        <meta name="theme-color" content="#7c6cff" />
      </head>
      <body className="min-h-screen bg-[#faf6f8] text-slate-800 antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
