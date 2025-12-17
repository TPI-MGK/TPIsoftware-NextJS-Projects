# 第十五章：添加元數據 (Metadata)

在上一章中，您為您的儀表板應用程式添加了身份驗證功能。在本章中，您將學習如何添加元數據 (Metadata) 以提高 SEO 和網頁可讀性。

## 在本章中...

以下是我們將涵蓋的主題：

-   什麼是元數據。
-   靜態與動態元數據。
-   如何添加元數據以提高 SEO 和分享性。

## 什麼是元數據 (Metadata)？

元數據是關於網頁的資訊，但它不會顯示在實際的網頁內容中。它存在於網頁的 HTML 檔案的 `<head>` 部分中，並由瀏覽器、搜尋引擎爬蟲和社群媒體機器人使用。

例如，當您在 Google 上搜尋「Next.js 儀表板教學」時，您會看到一個頁面列表。每個列表項都有一個標題和一個簡短的描述。這些資訊就是元數據！

元數據對於搜尋引擎優化 (SEO) 和社群媒體共享至關重要。它可以幫助您的網頁在搜尋結果中排名更高，並在社群媒體上分享時顯示豐富的預覽。

## 靜態與動態元數據

Next.js 提供兩種方式來為您的應用程式添加元數據：

### 靜態元數據 (Static Metadata)

您可以使用導出一個 `metadata` 物件來定義靜態元數據。此物件可以存在於您的 `layout.tsx` 或 `page.tsx` 檔案中。當頁面內容不需要動態生成元數據時，這是一個好選擇。

例如：

`/app/layout.tsx` 或 `/app/page.tsx`
```tsx
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
};
 
export default function Page() {
  return (
    // ...
  );
}
```

### 動態元數據 (Dynamic Metadata)

當您需要為頁面動態生成元數據時，您可以使用 `generateMetadata` 函數。此函數可以從 `props` 接收動態參數，並返回一個 `metadata` 物件。這對於像產品頁面或部落格文章這樣的頁面非常有用，這些頁面的標題和描述可能因內容而異。

例如：

`/app/blog/[slug]/page.tsx`
```tsx
import { Metadata } from 'next';
 
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
 
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product.title,
    description: product.description,
  };
}
 
export default function Page() {
  return (
    // ...
  );
}
```

## 練習：為儀表板添加元數據

現在是您的練習時間！

1.  **為根佈局添加靜態元數據**：打開您的 `/app/layout.tsx` 檔案，並為您的儀表板應用程式添加一個自訂標題和描述。

    `/app/layout.tsx`
    ```tsx
    import '@/app/ui/global.css';
    import { inter } from '@/app/ui/fonts';
    import { Metadata } from 'next';
     
    export const metadata: Metadata = {
      title: {
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
      },
      description: 'The official Next.js Course Dashboard, built with App Router.',
      metadataBase: new URL('https://next-learn-dashboard.vercel.app'),
    };
     
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
      );
    }
    ```
    您會注意到這裡我們使用了 `title` 的 `template` 和 `default` 屬性。`template` 允許您為應用程式中的每個頁面定義一個標題模板，而 `default` 則是在沒有特定頁面標題時使用的後備值。

2.  **覆蓋儀表板頁面元數據**：如果您還沒有這樣做，請將 `/app/dashboard/page.tsx` 中的 `<main>` 元素移動到 `app/dashboard/(overview)/page.tsx`。然後，在 `app/dashboard/(overview)/page.tsx` 中添加一個 `metadata` 物件來覆蓋根佈局中的預設標題：

    `/app/dashboard/(overview)/page.tsx`
    ```tsx
    import { Metadata } from 'next';
     
    export const metadata: Metadata = {
      title: 'Overview',
    };
     
    export default async function Page() {
      // ...
    }
    ```
    現在，如果您訪問儀表板頁面，您應該會在瀏覽器選項卡中看到標題已更改為「Overview | Acme Dashboard」。

3.  **為特定頁面添加動態元數據**：打開您的 `/app/dashboard/invoices/[id]/edit/page.tsx` 檔案，並添加一個 `generateMetadata` 函數以基於發票 ID 動態生成標題：

    `/app/dashboard/invoices/[id]/edit/page.tsx`
    ```tsx
    import Form from '@/app/ui/invoices/edit-form';
    import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
    import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
    import { notFound } from 'next/navigation';
    import { Metadata } from 'next';
     
    export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
      const id = params.id;
      const invoice = await fetchInvoiceById(id);
     
      return {
        title: `Edit Invoice ${invoice?.id}`,
      };
    }
     
    export default async function Page({ params }: { params: { id: string } }) {
      const id = params.id;
      const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);
     
      if (!invoice) {
        notFound();
      }
     
      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Invoices', href: '/dashboard/invoices' },
              {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
              },
            ]}
          />
          <Form invoice={invoice} customers={customers} />
        </main>
      );
    }
    ```
    現在，如果您訪問一個發票編輯頁面，您應該會在瀏覽器選項卡中看到標題已動態更改為類似「Edit Invoice {invoiceId} | Acme Dashboard」的內容。

## 開放圖譜 (Open Graph) 圖像

最後，讓我們為您的應用程式設定一個自訂的開放圖譜 (Open Graph) 圖像。開放圖譜是一種協議，允許網頁控制其在社群媒體上分享時的顯示方式。您可以透過在公共 (`/public`) 資料夾中放置一個 `opengraph-image.jpg` 檔案來實現此目的。

當您將您的應用程式部署到 Vercel 時，Next.js 將自動檢測此檔案並將其用作您的開放圖譜圖像。這將確保當您的應用程式在社群媒體上分享時，會顯示一個漂亮的預覽圖像。
```
