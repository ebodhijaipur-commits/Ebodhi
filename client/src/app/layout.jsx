import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PreFooterCta from '@/components/PreFooterCta';

export const metadata = {
  title: 'Ebodhi | Learn Without Limits',
  description: 'Ebodhi — online courses, internships and career growth.',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <PreFooterCta />
        <Footer />
      </body>
    </html>
  );
}
