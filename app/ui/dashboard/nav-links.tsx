'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

// 何要優化導航？
// 若要在頁面之間建立連結，傳統上您會使用 `<a>` HTML 元素。目前，側邊欄的連結使用的是 `<a>` 元素，但請注意當您在瀏覽器中於首頁、發票頁和客戶頁之間導航時會發生什麼。
// 您看到了嗎？每次頁面導航都會有一次**完整的頁面刷新**！

// 自動的程式碼分割與預先載入
// 為了改善導航體驗，Next.js 會根據路由區段自動對您的應用程式進行程式碼分割 (code splitting)。這與傳統的 React SPA（單頁應用程式）不同，後者會在初始載入時讓瀏覽器載入所有應用程式的程式碼。
// 按路由分割程式碼意味著頁面變得相互隔離。如果某個頁面拋出錯誤，應用程式的其餘部分仍然可以運作。
// 此外，在生產環境中，每當 `<Link>` 元件出現在瀏覽器的可視範圍內時，Next.js 都會自動在背景預先載入 (prefetch)所連結路由的程式碼。當使用者點擊連結時，目標頁面的程式碼已經在背景載入完畢，這就是為什麼頁面轉換幾乎是即時的！

// 一個常見的 UI 模式是顯示一個活動連結，以向使用者指示他們目前所在的頁面。要做到這一點，您需要從 URL 中獲取使用者當前的路徑。Next.js 提供了一個名為 `usePathname()` 的 hook，您可以使用它來檢查路徑並實現此模式。
// 由於 `usePathname()` 是一個 React hook，您需要將 `nav-links.tsx` 轉變為一個客戶端元件 (Client Component)。在檔案頂部添加 React 的 "use client" 指令，然後從 `next/navigation` 匯入 `usePathname()`：


export default function NavLinks() {
  const pathname = usePathname();
  // 您可以使用在 CSS 樣式章節中介紹的 `clsx` 函式庫，在連結處於活動狀態時(當前選取時)，有條件地應用 class 名稱。當 `link.href` 與 `pathname` 相符時，連結應顯示為藍色文字和淺藍色背景。
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3", 
              {
              "bg-sky-100 text-blue-600": pathname === link.href,
            }
          )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
