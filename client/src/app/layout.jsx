import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PreFooterCta from '../components/PreFooterCta';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata = {
  title: 'Ebodhi — Learn AI & Tech Skills, From School to Career',
  description:
    'Ebodhi offers AI literacy programs for school students, industry-ready tech training for college students, and career upskilling for working IT professionals in Jaipur.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <PreFooterCta />
        <Footer />
      </body>
    </html>
  );
}
