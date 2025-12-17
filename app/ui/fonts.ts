import { Inter, Lusitana } from 'next/font/google';

// 從 `next/font/google` 模組匯入 `Inter` 字體——這將是您的主要字體。然後，指定您想要載入的子集（subset）。在此案例中，我們使用 `'latin'`：
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});