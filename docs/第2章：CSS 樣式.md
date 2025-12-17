# 第二章：CSS 樣式

目前，您的首頁沒有任何樣式。讓我們來看看為 Next.js 應用程式設定樣式的不同方法。

## 在本章中...

以下是我們將涵蓋的主題：

-   如何為您的應用程式添加全域 CSS 檔案。
-   兩種不同的樣式設定方法：Tailwind 和 CSS Modules。
-   如何使用 `clsx` 工具包有條件地添加 class 名稱。

## 全域樣式 (Global Styles)

如果您查看 `/app/ui` 資料夾，您會看到一個名為 `global.css` 的檔案。您可以使用此檔案將 CSS 規則添加到應用程式中的所有路由——例如 CSS 重設規則、針對 HTML 元素（如連結）的全站樣式等。

您可以在應用程式的任何元件中匯入 `global.css`，但通常將其添加到頂層元件中是個好習慣。在 Next.js 中，這就是根佈局 (root layout)。

請導航至 `/app/layout.tsx` 並匯入 `global.css` 檔案，將全域樣式添加到您的應用程式中：

`/app/layout.tsx`
```tsx
import '@/app/ui/global.css';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

在開發伺服器仍在運行的情況下，儲存您的變更並在瀏覽器中預覽。您的首頁現在應該如下圖所示：

*帶有「Acme」標誌、描述和登入連結的已樣式化頁面。*

但等一下，您並沒有添加任何 CSS 規則，這些樣式是從哪裡來的呢？

如果您查看 `global.css` 的內部，您會注意到一些 `@tailwind` 指令：

`/app/ui/global.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind

Tailwind 是一個 CSS 框架，它允許您直接在 JSX/TSX 中快速編寫功能類別 (utility classes)，從而加快開發過程。

在 Tailwind 中，您透過添加 class 名稱來設定元素的樣式。例如，添加 `"text-blue-500"` 會將 `<h1>` 的文字變成藍色：

```html
<h1 className="text-blue-500">我是藍色的！</h1>
```

雖然 CSS 樣式是全域共享的，但每個 class 都是單獨應用於每個元素。這意味著如果您添加或刪除一個元素，您不必擔心維護單獨的樣式表、樣式衝突，或隨著應用程式擴展而導致 CSS 檔案大小增長的問題。

當您使用 `create-next-app` 啟動新專案時，Next.js 會詢問您是否要使用 Tailwind。如果您選擇「是」，Next.js 將自動安裝必要的套件並在您的應用程式中配置 Tailwind。

如果您查看 `/app/page.tsx`，您會看到我們在範例中使用了 Tailwind 的 class：

`/app/page.tsx`
```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export default function Page() {
  return (
    // 這些是 Tailwind 的 class：
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* ... */}
      </div>
    </main>
  );
}
```

如果這是您第一次使用 Tailwind，請不要擔心。為了節省時間，我們已經為您將要使用的所有元件設定好了樣式。

讓我們來試試 Tailwind！複製下面的程式碼並將其貼到 `/app/page.tsx` 中 `<p>` 元素上方：

`/app/page.tsx`
```tsx
<div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
```

如果您更喜歡編寫傳統的 CSS 規則或將樣式與 JSX 分開——那麼 CSS Modules 是一個很好的替代方案。

## CSS Modules

CSS Modules 允許您將 CSS 的作用域限定在一個元件內，它會自動產生獨一無二的 class 名稱，因此您也無需擔心樣式衝突。

在本課程中，我們將繼續使用 Tailwind，但讓我們花點時間看看如何使用 CSS Modules 實現與上面測驗相同的效果。

在 `/app/ui` 內，建立一個名為 `home.module.css` 的新檔案，並添加以下 CSS 規則：

`/app/ui/home.module.css`
```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

然後，在您的 `/app/page.tsx` 檔案中匯入樣式，並將您剛才添加的 `<div>` 的 Tailwind class 名稱替換為 `styles.shape`：

`/app/page.tsx`
```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
 
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
      {/* ... */}
    </main>
  );
}
```

儲存您的變更並在瀏覽器中預覽。您應該會看到與之前相同的形狀。

Tailwind 和 CSS Modules 是為 Next.js 應用程式設定樣式的兩種最常見方法。使用哪一種取決於個人偏好——您甚至可以在同一個應用程式中同時使用兩者！

## 使用 `clsx` 套件來切換 Class 名稱

在某些情況下，您可能需要根據狀態或其他條件來有條件地設定元素的樣式。

`clsx` 是一個讓您輕鬆切換 class 名稱的套件。我們建議您查看其[文件](https://github.com/lukeed/clsx)以獲取更多詳細資訊，但以下是基本用法：

假設您想要建立一個 `InvoiceStatus` 元件，它接受 `status` 屬性。`status` 可以是 `'pending'` 或 `'paid'`。

-   如果狀態是 `'paid'`，您希望顏色是綠色。
-   如果狀態是 `'pending'`，您希望顏色是灰色。

您可以使用 `clsx` 來有條件地應用這些 class，如下所示：

`/app/ui/invoices/status.tsx`
```tsx
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {/* ... */}
    </span>
  );
}
```

## 其他樣式解決方案

除了我們討論過的方法外，您還可以使用以下方式為您的 Next.js 應用程式設定樣式：

-   **Sass**：允許您匯入 `.css` 和 `.scss` 檔案。
-   **CSS-in-JS**：使用 `styled-jsx`、`styled-components` 和 `emotion` 等函式庫。

查看 Next.js 的 [CSS 文件](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)以獲取更多資訊。