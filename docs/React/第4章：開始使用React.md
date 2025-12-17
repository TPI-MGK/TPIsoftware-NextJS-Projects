# 第 4 章：開始使用 React

要在您新建立的專案中使用 React，請從一個名為 unpkg.com 的外部網站載入兩個 React 指令碼：
- `react` 是核心的 React 函式庫。
- `react-dom` 提供了 DOM 特有的方法，讓您能夠將 React 與 DOM 一起使用。

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/javascript">
      const app = document.getElementById('app');
      const header = document.createElement('h1');
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);
      header.appendChild(headerContent);
      app.appendChild(header);
    </script>
  </body>
</html>
```

與其直接使用原生 JavaScript 操作 DOM，不如移除您之前新增的 DOM 方法，並新增 `ReactDOM.createRoot()` 方法來鎖定一個特定的 DOM 元素，並建立一個根來顯示您的 React 元件。然後，新增 `root.render()` 方法將您的 React 程式碼渲染到 DOM 中。
這將告訴 React 在我們的 `#app` 元素內渲染我們的 `<h1>` 標題。

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script>
      const app = document.getElementById('app');
      const root = ReactDOM.createRoot(app);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```

如果您嘗試在瀏覽器中執行此程式碼，您將會得到一個語法錯誤：

**終端機**
```
Uncaught SyntaxError: expected expression, got '<'
```

這是因為 `<h1>...</h1>` 不是有效的 Javascript。這段程式碼是 JSX。

## 什麼是 JSX？
JSX 是 JavaScript 的語法擴充，允許您以熟悉的類 HTML 語法來描述您的 UI。JSX 的好處在於，除了遵循三個 JSX 規則外，您不需要學習任何 HTML 和 JavaScript 以外的新符號或語法。
但是瀏覽器本身無法理解 JSX，所以您需要一個 JavaScript 編譯器，例如 Babel，來將您的 JSX 程式碼轉換為常規的 JavaScript。

## 將 Babel 加入您的專案
要將 Babel 加入您的專案，請將以下指令碼複製並貼到您的 `index.html` 檔案中：

**index.html**
```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

此外，您需要透過將指令碼類型更改為 `type="text/jsx"` 來告知 Babel 要轉換哪些程式碼。

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel 指令碼 -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/jsx">
      const domNode = document.getElementById('app');
      const root = ReactDOM.createRoot(domNode);
      root.render(<h1>Develop. Preview. Ship.</h1>);
    </script>
  </body>
</html>
```

要確認它是否正常運作，請在瀏覽器中開啟您的 HTML 檔案。
比較您剛才編寫的宣告式 React 程式碼：

**index.html**
```html
<script type="text/jsx">
  const domNode = document.getElementById('app');
  const root = ReactDOM.createRoot(domNode);
  root.render(<h1>Develop. Preview. Ship.</h1>);
</script>
```

與您在上一節中編寫的命令式 JavaScript 程式碼：

**index.html**
```html
<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const text = 'Develop. Preview. Ship.';
  const headerContent = document.createTextNode(text);
  header.appendChild(headerContent);
  app.appendChild(header);
</script>
```

您可以看到使用 React 如何讓您減少大量重複的程式碼。
而這正是 React 所做的，它是一個函式庫，包含可重複使用的程式碼片段，代您執行任務——在這種情況下，是更新 UI。

## 額外資源：
您不需要確切知道 React 如何更新 UI 才能開始使用它，但如果您想了解更多，這裡有一些額外資源：
- [UI 樹](https://react.dev/learn/understanding-your-ui-as-a-tree)
- [使用 JSX 編寫標記](https://react.dev/learn/writing-markup-with-jsx)
- React 文件中的 [react-dom/server](https://react.dev/reference/react-dom/server) 部分。

## React 的必備 JavaScript 知識
雖然您可以同時學習 JavaScript 和 React，但熟悉 JavaScript 可以讓學習 React 的過程更容易。
在接下來的幾節中，將從 JavaScript 的角度介紹一些 React 的核心概念。以下是將會提到的 JavaScript 主題摘要：
- 函式和箭頭函式
- 物件
- 陣列和陣列方法
- 解構
- 樣板字面值
- 三元運算子
- ES 模組和 Import / Export 語法

雖然本課程不深入探討 JavaScript，但隨時更新最新的 JavaScript 版本是個好習慣。但如果您還不覺得精通 JavaScript，別讓這阻礙您開始使用 React 進行建構！
