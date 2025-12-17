import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       {/* Tailwind 的 `antialiased` class，它可以使字體顯示更平滑。這不是必須的，但能增添一些細緻的美感。 */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
