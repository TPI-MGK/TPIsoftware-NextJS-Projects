# 第 5 章：使用元件建構 UI

## React 核心概念

要開始建構 React 應用程式，您需要熟悉三個 React 的核心概念。它們是：

- **元件 (Components)**
- **屬性 (Props)**
- **狀態 (State)**
  在接下來的章節中，我們將逐一介紹這些概念，並提供資源讓您可以繼續學習。在熟悉這些概念之後，我們將向您展示如何安裝 Next.js 以及如何使用新的 React 功能，例如伺服器元件和客戶端元件。

## 元件 (Components)

使用者介面可以被分解成稱為**元件**的更小的建構區塊。
元件讓您可以建構獨立、可重複使用的程式碼片段。如果您將元件想像成樂高積木，您可以將這些單獨的積木組合在一起形成更大的結構。如果您需要更新 UI 的某一部分，您可以只更新特定的元件或積木。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-components.png&w=3840&q=75)

這種模組化使您的程式碼在增長時更易於維護，因為您可以新增、更新和刪除元件，而不會影響到應用程式的其餘部分。
React 元件的好處在於它們只是 JavaScript。讓我們從 JavaScript 的角度看看如何編寫一個 React 元件：

### 建立元件

在 React 中，元件就是函式。在您的 `script` 標籤內，建立一個名為 `header` 的新函式：

**index.html**

```html
<script type="text/jsx">
  const app = document.getElementById('app');

  function header() {}

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

元件是一個回傳 UI 元素的函式。在函式的 `return` 語句中，您可以編寫 JSX：

**index.html**

```html
<script type="text/jsx">
  const app = document.getElementById('app');

  function header() {
    return <h1>Develop. Preview. Ship.</h1>;
  }

  const root = ReactDOM.createRoot(app);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

要將此元件渲染到 DOM，請將其作為第一個參數傳遞給 `root.render()` 方法：

**index.html**

```html
<script type="text/jsx">
  const app = document.getElementById('app');

  function header() {
    return <h1>Develop. Preview. Ship.</h1>;
  }

  const root = ReactDOM.createRoot(app);
  root.render(header);
</script>
```

但是，等等。如果您嘗試在瀏覽器中執行上面的程式碼，您會得到一個錯誤。要使其正常運作，您必須做兩件事：
首先，React 元件應該**大寫**，以區別於普通的 HTML 和 JavaScript：

**index.html**

```html
function Header() { return
<h1>Develop. Preview. Ship.</h1>
; } const root = ReactDOM.createRoot(app); // 將 React 元件大寫
root.render(Header);
```

其次，您使用 React 元件的方式與使用常規 HTML 標籤相同，使用角括號 `<>`：

**index.html**

```html
function Header() { return
<h1>Develop. Preview. Ship.</h1>
; } const root = ReactDOM.createRoot(app); root.render(
<header />
);
```

如果您再次在瀏覽器中執行程式碼，您將會看到您的變更。

### 巢狀元件

應用程式通常包含比單一元件更多的內容。您可以像巢狀常規 HTML 元素一樣，將 React 元件巢狀在彼此內部。
在您的範例中，建立一個名為 `HomePage` 的新元件：

**index.html**

```html
function Header() { return
<h1>Develop. Preview. Ship.</h1>
; } function HomePage() { return
<div></div>
; } const root = ReactDOM.createRoot(app); root.render(
<header />
);
```

然後將 `<Header>` 元件巢狀到新的 `<HomePage>` 元件中：

**index.html**

```html
function Header() { return
<h1>Develop. Preview. Ship.</h1>
; } function HomePage() { return (
<div>
  {/* 巢狀 Header 元件 */}
  <header />
</div>
); } const root = ReactDOM.createRoot(app); root.render(
<header />
);
```

### 元件樹

您可以繼續以這種方式巢狀 React 元件以形成**元件樹**。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-component-tree.png&w=3840&q=75)

例如，您的頂層 `HomePage` 元件可以包含一個 `Header`、一個 `Article` 和一個 `Footer` 元件。而這些元件中的每一個又可以有自己的子元件，依此類推。例如，`Header` 元件可以包含一個 `Logo`、`Title` 和 `Navigation` 元件。
這種模組化格式允許您在應用程式的不同位置重複使用元件。

在您的專案中，由於 `<HomePage>` 現在是您的頂層元件，您可以將它傳遞給 `root.render()` 方法：

**index.html**

```html
function Header() { return
<h1>Develop. Preview. Ship.</h1>
; } function HomePage() { return (
<div>
  <header />
</div>
); } const root = ReactDOM.createRoot(app); root.render(<HomePage />);
```

## 額外資源：

- [您的第一個元件](https://react.dev/learn/your-first-component)
- [匯入和匯出元件](https://react.dev/learn/importing-and-exporting-components)
