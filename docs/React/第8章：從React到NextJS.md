# 第 8 章：從 React 到 Next.js

到目前為止，我們探討了如何開始使用 React。這是最終的程式碼。如果您是從這裡開始，請將此程式碼貼到您程式碼編輯器中的 `index.html` 檔案。

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
 
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
 
    <script type="text/jsx">
      const app = document.getElementById("app")
 
      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }
 
      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]
 
        const [likes, setLikes] = React.useState(0)
 
        function handleClick() {
          setLikes(likes + 1)
        }
 
        return (
          <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
 
            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }
 
      const root = ReactDOM.createRoot(app);
      root.render(<HomePage />);
    </script>
  </body>
</html>
```

在過去的幾章中，您學到了三個基本的 React 概念：**元件、屬性 (props) 和狀態 (state)**。在這些方面打下堅實的基礎將有助於您開始建構 React 應用程式。
在學習 React 時，最好的學習方式就是動手做。您可以透過使用 `<script>` 標籤以及您目前所學的知識，逐步將小型元件新增到現有的網站中。然而，許多開發者發現 React 所帶來的使用者和開發者體驗非常有價值，因此直接投入並用 React 編寫他們整個前端應用程式。

## 從 React 到 Next.js
雖然 React 在建構 UI 方面表現出色，但要將該 UI 獨立地建構成一個功能齊全、可擴展的應用程式，還需要一些功夫。此外，還有一些較新的 React 功能，例如**伺服器元件 (Server Components)** 和**客戶端元件 (Client Components)**，這些都需要一個框架。好消息是，Next.js 處理了大部分的設定和配置，並提供額外的功能來幫助您建構 React 應用程式。
接下來，我們將把範例從 React 遷移到 Next.js，討論 Next.js 的運作方式，並向您介紹伺服器元件和客戶端元件之間的差異。