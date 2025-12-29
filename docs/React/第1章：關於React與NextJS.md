# 第 1 章：關於 React 與 Next.js

Next.js 是一個靈活的 React 框架，提供您建立快速、全端 Web 應用程式的建構區塊。
但這到底是什麼意思呢？讓我們花點時間深入探討 React 和 Next.js 是什麼，以及它們如何幫助您建構 Web 應用程式。

## Web 應用程式的建構區塊

在建構現代應用程式時，您需要考慮以下幾件事：

- **使用者介面 (User Interface)** - 使用者如何使用您的應用程式並與之互動。
- **路由 (Routing)** - 使用者如何在應用程式的不同部分之間導覽。
- **資料獲取 (Data Fetching)** - 您的資料在哪裡以及如何取得。
- **渲染 (Rendering)** - 您何時何地渲染靜態或動態內容。
- **整合 (Integrations)** - 您使用哪些第三方服務（如 CMS、驗證、支付等）以及如何連接它們。
- **基礎設施 (Infrastructure)** - 您在哪裡部署、儲存和執行您的應用程式碼（無伺服器、CDN、邊緣運算等）。
- **效能 (Performance)** - 如何為終端使用者優化您的應用程式。
- **可擴展性 (Scalability)** - 隨著您的團隊、資料和流量的增長，您的應用程式如何適應。
- **開發者體驗 (Developer Experience)** - 您的團隊建構和維護應用程式的體驗。

對於應用程式的每個部分，您都需要決定是要自己建構解決方案，還是使用其他工具，例如套件、函式庫和框架。

## 什麼是 React？

React 是一個用於建構互動式使用者介面的 JavaScript 函式庫。
所謂的**使用者介面 (UI)**，我們指的是使用者在螢幕上看到並與之互動的元素。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-react-components.png&w=3840&q=75)

所謂**函式庫**，我們指的是 React 提供了有助於建構 UI 的函式 (API)，但將在哪裡使用這些函式交給開發者決定。
React 成功的部分原因在於它對於建構應用程式的其他方面相對不固執己見。這催生了一個蓬勃發展的第三方工具和解決方案生態系統，其中也包括 Next.js。
然而，這也意味著從頭開始建構一個完整的 React 應用程式需要一些努力。開發者需要花時間配置工具並為常見的應用程式需求重新發明解決方案。

## 什麼是 Next.js？

Next.js 是一個 React 框架，提供您建立 Web 應用程式的建構區塊。
所謂**框架**，我們指的是 Next.js 處理了 React 所需的工具和配置，並為您的應用程式提供了額外的結構、功能和優化。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-ecosystem.png&w=3840&q=75)

您可以使用 React 來建構您的 UI，然後逐步採用 Next.js 的功能來解決常見的應用程式需求，例如路由、資料獲取和快取——同時改善開發者和終端使用者的體驗。
無論您是個人開發者還是大型團隊的一員，您都可以使用 React 和 Next.js 來建構完全互動、高度動態和高效能的 Web 應用程式。
在接下來的章節中，我們將討論如何開始使用 React 和 Next.js。
