# 第九章：串流 (Streaming)

在上一章中，您學習了 Next.js 的不同渲染方法。我們也討論了緩慢的資料獲取如何影響您應用程式的效能。接下來，讓我們看看當存在緩慢的資料請求時，如何改善使用者體驗。

## 在本章中...

以下是我們將涵蓋的主題：

- 什麼是串流 (streaming) 及其使用時機。
- 如何使用 `loading.tsx` 和 Suspense 實現串流。
- 什麼是載入骨架 (loading skeletons)。
- 什麼是 Next.js 路由群組 (Route Groups) 及其使用時機。
- 在您的應用程式中應於何處放置 React Suspense 邊界。

## 什麼是串流 (Streaming)？

串流是一種資料傳輸技術，它允許您將路由分解成更小的「區塊」(chunks)，並在它們準備就緒時，逐步地從伺服器串流到客戶端。

![帶有串流的伺服器渲染](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Fserver-rendering-with-streaming.png&w=3840&q=75)

透過串流，您可以防止緩慢的資料請求阻塞您的整個頁面。這允許使用者在所有資料載入完畢之前，就能看到頁面的部分內容並與之互動。

![帶有串流的伺服器渲染圖表](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75)

串流與 React 的元件模型非常契合，因為每個元件都可以被視為一個區塊。

在 Next.js 中，您有兩種方式可以實現串流：

1.  在**頁面層級**，使用 `loading.tsx` 檔案（它會為您建立 `<Suspense>`）。
2.  在**元件層級**，使用 `<Suspense>` 進行更細粒度的控制。

讓我們看看這是如何運作的。

## 使用 `loading.tsx` 串流整個頁面

在 `/app/dashboard` 資料夾中，建立一個名為 `loading.tsx` 的新檔案：

`/app/dashboard/loading.tsx`

```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

重新整理 `http://localhost:3000/dashboard`，您現在應該會看到：

這裡發生了幾件事：

- `loading.tsx` 是一個基於 React Suspense 的特殊 Next.js 檔案。它允許您建立一個備用 UI (fallback UI)，在頁面內容載入時作為替代顯示。
- 由於 `<SideNav>` 是靜態的，它會立即顯示。使用者可以在動態內容載入時與 `<SideNav>` 互動。
- 使用者不必等待頁面完成載入才能導航離開（這稱為**可中斷導航 (interruptable navigation)**）。

恭喜！您剛剛實現了串流。但我們可以做得更多來改善使用者體驗。讓我們顯示一個載入骨架，而不是「Loading…」文字。

## 添加載入骨架 (Loading Skeletons)

載入骨架是 UI 的簡化版本。許多網站使用它們作為佔位符（或備用）來向使用者表明內容正在載入。您在 `loading.tsx` 中添加的任何 UI 都將作為靜態檔案的一部分被嵌入，並首先發送。然後，其餘的動態內容將從伺服器串流到客戶端。

在您的 `loading.tsx` 檔案中，匯入一個名為 `<DashboardSkeleton>` 的新元件：

`/app/dashboard/loading.tsx`

```tsx
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
```

然後，重新整理 `http://localhost:3000/dashboard`，您現在應該會看到載入骨架。

## 使用路由群組修復載入骨架的 Bug

目前，您的載入骨架將應用於 `invoices` 和 `customers` 頁面。由於 `loading.tsx` 在檔案系統中比 `/invoices/page.tsx` 和 `/customers/page.tsx` 高一個層級，因此它也被應用於這些頁面。

我們可以使用**路由群組 (Route Groups)** 來改變這一點。在 `dashboard` 資料夾內建立一個名為 `(overview)` 的新資料夾。然後，將您的 `loading.tsx` 和 `page.tsx` 檔案移動到該資料夾內：

![路由群組結構圖](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Froute-group.png&w=3840&q=75)

現在，`loading.tsx` 檔案將只應用於您的儀表板概覽頁面。

路由群組允許您將檔案組織成邏輯群組，而**不影響 URL 路徑結構**。當您使用括號 `()` 建立新資料夾時，該名稱不會包含在 URL 路徑中。所以 `/dashboard/(overview)/page.tsx` 變成了 `/dashboard`。

在這裡，您使用路由群組來確保 `loading.tsx` 只應用於您的儀表板概覽頁面。然而，您也可以使用路由群組將您的應用程式分成幾個部分（例如 `(marketing)` 路由和 `(shop)` 路由），或在大型應用程式中按團隊劃分。

## 串流一個元件

到目前為止，您正在串流整個頁面。但您也可以使用 React Suspense 進行更細粒度的串流，即串流特定的元件。

**Suspense** 允許您延遲應用程式某些部分的渲染，直到滿足某些條件（例如，資料載入完成）。您可以將動態元件包裹在 Suspense 中。然後，傳遞一個備用 UI (fallback UI) 給它，以便在動態元件載入時顯示。

如果您還記得那個緩慢的資料請求 `fetchRevenue()`，正是這個請求拖慢了整個頁面的速度。與其阻塞整個頁面，您可以使用 Suspense 只串流這個元件，並立即顯示頁面的其餘 UI。

為此，您需要將資料獲取移動到元件中。讓我們更新程式碼看看會是什麼樣子：

1.  從 `/dashboard/(overview)/page.tsx` 中**刪除**所有 `fetchRevenue()` 的實例及其資料：

    `/app/dashboard/(overview)/page.tsx`

    ```tsx
    import { Card } from '@/app/ui/dashboard/cards';
    import RevenueChart from '@/app/ui/dashboard/revenue-chart';
    import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
    import { lusitana } from '@/app/ui/fonts';
    import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // 刪除 fetchRevenue

    export default async function Page() {
      // const revenue = await fetchRevenue() // 刪除此行
      const latestInvoices = await fetchLatestInvoices();
      const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();

      return (
        // ...
      );
    }
    ```

2.  接下來，從 React 匯入 `<Suspense>`，並將它包裹在 `<RevenueChart />` 周圍。您可以傳遞一個名為 `<RevenueChartSkeleton>` 的備用元件給它。

    `/app/dashboard/(overview)/page.tsx`

    ```tsx
    import { Card } from "@/app/ui/dashboard/cards";
    import RevenueChart from "@/app/ui/dashboard/revenue-chart";
    import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
    import { lusitana } from "@/app/ui/fonts";
    import { fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
    import { Suspense } from "react";
    import { RevenueChartSkeleton } from "@/app/ui/skeletons";

    export default async function Page() {
      const latestInvoices = await fetchLatestInvoices();
      const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();

      return (
        <main>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Collected"
              value={totalPaidInvoices}
              type="collected"
            />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card
              title="Total Invoices"
              value={numberOfInvoices}
              type="invoices"
            />
            <Card
              title="Total Customers"
              value={numberOfCustomers}
              type="customers"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <RevenueChart />
            </Suspense>
            <LatestInvoices latestInvoices={latestInvoices} />
          </div>
        </main>
      );
    }
    ```

3.  最後，更新 `<RevenueChart>` 元件以獲取自己的資料，並移除傳遞給它的 `prop`：

    `/app/ui/dashboard/revenue-chart.tsx`

    ```tsx
    import { generateYAxis } from '@/app/lib/utils';
    import { CalendarIcon } from '@heroicons/react/24/outline';
    import { lusitana } from '@/app/ui/fonts';
    import { fetchRevenue } from '@/app/lib/data';

    // ...

    export default async function RevenueChart() { // 將元件設為 async，移除 props
      const revenue = await fetchRevenue(); // 在元件內部獲取資料

      const chartHeight = 350;
      const { yAxisLabels, topLabel } = generateYAxis(revenue);

      if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
      }

      return (
        // ...
      );
    }
    ```

現在重新整理頁面，您應該會看到儀表板資訊幾乎立即顯示，而 `<RevenueChart>` 則顯示一個備用 UI (fallback UI) 載入骨架。

### 練習：串流 `<LatestInvoices>`

現在輪到您了！練習您剛剛學到的知識，串流 `<LatestInvoices>` 元件。

- 將 `fetchLatestInvoices()` 從頁面下移到 `<LatestInvoices>` 元件中。
- 將該元件包裹在一個 `<Suspense>` 邊界中，並使用一個名為 `<LatestInvoicesSkeleton>` 的備用 UI (fallback UI) 載入骨架。

<details>
<summary>點此展開解決方案</summary>

**儀表板頁面：**

`/app/dashboard/(overview)/page.tsx`

```tsx
import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data"; // 移除 fetchLatestInvoices
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  // 移除 `const latestInvoices = await fetchLatestInvoices()`
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
```

**`<LatestInvoices>` 元件（記得移除 props）：**

`/app/ui/dashboard/latest-invoices.tsx`

```tsx
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() { // 移除 props
  const latestInvoices = await fetchLatestInvoices();

  return (
    // ...
  );
}
```

</details>

## 元件分組

太棒了！您幾乎完成了，現在您需要將 `<Card>` 元件包裹在 Suspense 中。您可以為每個卡片單獨獲取資料，但這可能會導致卡片載入時出現彈出效應，這對使用者來說可能會造成視覺上的干擾。

那麼，您會如何解決這個問題呢？

為了創造更具層次感的載入效果，您可以使用一個包裝元件 (wrapper component) 來對卡片進行分組。這意味著靜態的 `<SideNav/>` 將首先顯示，其次是卡片等。

在您的 `page.tsx` 檔案中：

1.  刪除您的 `<Card>` 元件。
2.  刪除 `fetchCardData()` 函數。
3.  匯入一個名為 `<CardWrapper />` 的新包裝元件。
4.  匯入一個名為 `<CardsSkeleton />` 的新骨架元件。
5.  將 `<CardWrapper />` 包裹在 Suspense 中。

`/app/dashboard/(overview)/page.tsx`

```tsx
import CardWrapper from "@/app/ui/dashboard/cards";
// ...
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      {/* ... */}
    </main>
  );
}
```

然後，進入檔案 `/app/ui/dashboard/cards.tsx`，匯入 `fetchCardData()` 函數，並在 `<CardWrapper/>` 元件內部調用它。請確保取消此元件中任何必要程式碼的註解。

`/app/ui/dashboard/cards.tsx`

```tsx
// ...
import { fetchCardData } from "@/app/lib/data";

// ...

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```

重新整理頁面，您應該會看到所有卡片同時載入。當您希望多個元件同時載入時，可以使用此模式。

## 決定在哪裡放置 Suspense 邊界

您放置 Suspense 邊界的位置將取決於幾件事：

- 您希望使用者在頁面串流時有怎樣的體驗。
- 您想優先顯示哪些內容。
- 元件是否依賴於資料獲取。

看看您的儀表板頁面，您會有什麼不同的作法嗎？

別擔心，沒有標準答案。

- 您可以像我們使用 `loading.tsx` 那樣串流整個頁面... 但如果其中一個元件的資料獲取很慢，可能會導致更長的載入時間。
- 您可以單獨串流每個元件... 但這可能會導致 UI 在準備就緒時突然彈出到螢幕上。
- 您也可以通過串流頁面區塊來創造一種交錯的效果。但您需要建立包裝元件。

您放置 Suspense 邊界的位置會根據您的應用程式而有所不同。一般來說，將資料獲取下移到需要它的元件中，然後將這些元件包裹在 Suspense 中是一個好習慣。但如果您的應用程式需要，串流區塊或整個頁面也完全沒有問題。

不要害怕嘗試 Suspense，看看什麼最有效，它是一個強大的 API，可以幫助您創造更愉悅的使用者體驗。

### 展望未來

串流媒體和伺服器元件為我們提供了處理資料擷取和載入狀態的新方法，最終目標是改善最終用戶體驗。
