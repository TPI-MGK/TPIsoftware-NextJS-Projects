# 第 2 章：渲染使用者介面 (UI)

要了解 React 如何運作，我們首先需要對瀏覽器如何解讀您的程式碼以建立（或渲染）使用者介面 (UI) 有一個基本的了解。
當使用者造訪網頁時，伺服器會向瀏覽器返回一個 HTML 檔案，可能如下所示：

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-html-and-dom.png&w=3840&q=75)

然後瀏覽器會讀取 HTML 並建構文件物件模型 (Document Object Model, DOM)。

## 什麼是 DOM？
DOM 是 HTML 元素的物件表示法。它充當您的程式碼和使用者介面之間的橋樑，並具有帶有父子關係的樹狀結構。

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-dom-and-ui.png&w=3840&q=75)

您可以使用 DOM 方法和 JavaScript 來監聽使用者事件，並透過選擇、新增、更新和刪除使用者介面中的特定元素來操作 DOM。DOM 操作不僅可以讓您鎖定特定元素，還可以更改它們的樣式和內容。
在下一節中，您將學習如何使用 JavaScript 和 DOM 方法。

## 額外資源：
- [DOM 簡介](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)
- [如何在 Google Chrome 中檢視 DOM](https://developer.chrome.com/docs/devtools/dom/)
- [如何在 Firefox 中檢視 DOM](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_the_dom/)