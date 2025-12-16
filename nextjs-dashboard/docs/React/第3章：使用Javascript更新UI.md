# 第 3 章：使用 Javascript 更新 UI

在本章中，我們將開始建構我們的專案，使用 JavaScript 和 DOM 方法為您的專案新增一個 `<h1>` 標籤。
開啟您的程式碼編輯器並建立一個新的 `index.html` 檔案。在 HTML 檔案中，新增以下程式碼：

**index.html**
```html
<html>
  <body>
    <div></div>
  </body>
</html>
```

然後給 `div` 一個唯一的 `id`，以便您之後可以鎖定它。

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
  </body>
</html>
```

若要在 HTML 檔案中編寫 JavaScript，請新增一個 `script` 標籤：

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript"></script>
  </body>
</html>
```

現在，在 `script` 標籤內，您可以使用 DOM 方法 `getElementById()`，透過其 `id` 來選取 `<div>` 元素：

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      const app = document.getElementById('app');
    </script>
  </body>
</html>
```

您可以繼續使用 DOM 方法來建立一個新的 `<h1>` 元素：

**index.html**
```html
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      // 選取 id 為 'app' 的 div 元素
      const app = document.getElementById('app');
 
      // 建立一個新的 H1 元素
      const header = document.createElement('h1');
 
      // 為 H1 元素建立一個新的文字節點
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);
 
      // 將文字附加到 H1 元素
      header.appendChild(headerContent);
 
      // 將 H1 元素放入 div 中
      app.appendChild(header);
    </script>
  </body>
</html>
```

為確保一切正常，請在您選擇的瀏覽器中開啟您的 HTML 檔案。您應該會看到一個 `<h1>` 標籤，上面寫著「Develop. Preview. Ship.」。

## HTML vs. DOM

如果您在瀏覽器開發者工具中查看 DOM 元素，您會注意到 DOM 包含了 `<h1>` 元素。頁面的 DOM 與原始碼不同——換句話說，與您建立的原始 HTML 檔案不同。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-dom-and-source.png&w=3840&q=75)

這是因為 HTML 代表初始頁面內容，而 DOM 代表由您編寫的 JavaScript 程式碼更改後的更新頁面內容。
使用原生 JavaScript 更新 DOM 非常強大，但也很冗長。您編寫了所有這些程式碼來新增一個帶有文字的 `<h1>` 元素：

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

隨著應用程式或團隊規模的增長，以這種方式建構應用程式可能會變得越來越具挑戰性。
使用這種方法，開發者需要花費大量時間編寫指令來告訴電腦應該如何做事。但是，如果能夠描述您想要顯示的內容，讓電腦自行解決如何更新 DOM，那不是很好嗎？

## 命令式 vs. 宣告式程式設計
上面的程式碼是**命令式程式設計 (imperative programming)** 的一個好例子。您正在編寫使用者介面應該如何更新的步驟。但是，在建構使用者介面時，通常首選**宣告式方法 (declarative approach)**，因為它可以加快開發過程。如果開發者能夠宣告他們想要顯示的內容（在這種情況下，是一個帶有文字的 h1 標籤），而不是必須編寫 DOM 方法，那將會很有幫助。
換句話說，命令式程式設計就像是給廚師一步一步的指示如何製作披薩。宣告式程式設計就像是點一個披薩，而不關心製作披薩需要哪些步驟。🍕
React 是一個流行的宣告式函式庫，您可以用它來建構使用者介面。

## React：一個宣告式的 UI 函式庫
作為開發者，您可以告訴 React 您希望使用者介面發生什麼，React 將會為您解決如何更新 DOM 的步驟。
在下一節中，我們將探討如何開始使用 React。

## 額外資源：
- [HTML vs. the DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)
- [宣告式 UI 與命令式 UI 的比較](https://react.dev/learn/reacting-to-input-with-state#how-declarative-ui-compares-to-imperative)