import SideNav from '@/app/ui/dashboard/sidenav';
 
// 儀表板通常會有一些在多個頁面之間共享的導航。在 Next.js 中，您可以使用特殊的 layout.tsx 檔案來建立在多個頁面之間共享的 UI。

// 首先，您將 <SideNav /> 元件匯入到您的版面配置中。您匯入到此檔案的任何元件都將成為版面配置的一部分。
// <Layout /> 元件接收一個 children 屬性 (prop)。這個 children 可以是一個頁面，也可以是另一個版面配置。在您的案例中，/dashboard 內部頁面將自動巢狀在 <Layout /> 內部。
// Next.js 中使用版面配置的一個好處是，在導航時，只有頁面元件會更新，而版面配置不會重新渲染。這稱為部分渲染 (partial rendering)，它在頁面轉換時會保留版面配置中的客戶端 React 狀態。

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
