import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import CardWrapper from "@/app/ui/dashboard/cards";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

// 本頁面是一個 async 伺服器元件。這允許您使用 await 來獲取資料。
// 還有 3 個接收資料的元件：<Card>、<RevenueChart> 和 <LatestInvoices>。

export default async function Page() {
  // 什麼是請求瀑布 (Request Waterfalls)？
  // 「瀑布」指的是一系列依賴於前一個請求完成的網路請求。在資料獲取的情況下，每個請求只有在前一個請求返回資料後才能開始。
  // 例如，我們需要等待 `fetchRevenue()` 執行完畢，`fetchLatestInvoices()` 才能開始運行，以此類推。

  // 平行資料獲取
  // 避免瀑布的一個常見方法是同時發起所有資料請求 — 即平行 (in parallel)。
  // 在 JavaScript 中，您可以使用 `Promise.all()` 或 `Promise.allSettled()` 函數來同時發起所有 promises。
  // - 同時開始執行所有資料獲取，這比在瀑布中等待每個請求完成要快。
  // - 使用一個可以應用於任何函式庫或框架的原生 JavaScript 模式。

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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 局部 FetchData Loading */}
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
