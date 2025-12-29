# 第 7 章：使用 State 增加互動性

讓我們探討一下 React 如何幫助我們透過**狀態 (state)** 和**事件處理器 (event handlers)** 來增加互動性。
舉例來說，讓我們在 `HomePage` 元件中建立一個「喜歡」按鈕。首先，在 `return()` 語句中新增一個 `button` 元素：

**index.html**

```html
function HomePage() { const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret
Hamilton']; return (
<div>
  <header title="Develop. Preview. Ship." />
  <ul>
    {names.map((name) => (
    <li key="{name}">{name}</li>
    ))}
  </ul>
  <button>Like</button>
</div>
); }
```

## 監聽事件

為了讓按鈕在點擊時做些什麼，您可以使用 `onClick` 事件：

**index.html**

```html
function HomePage() { // ... return (
<div>
  {/* ... */}
  <button onClick="{}">Like</button>
</div>
); }
```

在 React 中，事件名稱是駝峰式命名 (camelCased)。`onClick` 事件是您可以用来回應使用者互動的眾多可能事件之一。例如，您可以對輸入欄位使用 `onChange`，或對表單使用 `onSubmit`。

## 處理事件

您可以定義一個函式來「處理」事件，無論它們何時被觸發。在 `return` 語句之前建立一個名為 `handleClick()` 的函式：

**index.html**

```html
function HomePage() { // ... function handleClick() { console.log("increment
like count") } return (
<div>
  {/* ... */}
  <button onClick="{}">Like</button>
</div>
) }
```

然後，您可以在 `onClick` 事件被觸發時呼叫 `handleClick` 函式：

**index.html**

```html
function HomePage() { // ... function handleClick() { console.log('increment
like count'); } return (
<div>
  {/* ... */}
  <button onClick="{handleClick}">Like</button>
</div>
); }
```

請在您的瀏覽器中執行此程式碼。注意在您的開發者工具中，日誌輸出是如何增加的。

## 狀態 (State) 和鉤子 (Hooks)

React 有一組稱為**鉤子 (hooks)** 的函式。鉤子允許您為元件增加額外的邏輯，例如**狀態**。您可以將狀態視為 UI 中隨時間變化的任何資訊，通常由使用者互動觸發。

您可以使用狀態來儲存和增加使用者點擊「喜歡」按鈕的次數。事實上，用於管理狀態的 React 鉤子就叫做：`useState()`
將 `useState()` 新增到您的專案中。它會回傳一個陣列，您可以使用陣列解構在元件內部存取和使用這些陣列值：

**index.html**

```html
function HomePage() { // ... const [] = React.useState(); // ... }
```

陣列中的第一項是**狀態值**，您可以任意命名。建議將其命名為具描述性的名稱：

**index.html**

```html
function HomePage() { // ... const [likes] = React.useState(); // ... }
```

陣列中的第二項是**更新該值的函式**。您可以任意命名更新函式，但通常會在您要更新的狀態變數名稱前加上 `set`：

**index.html**

```html
function HomePage() { // ... const [likes, setLikes] = React.useState(); // ...
}
```

您也可以趁此機會將 `likes` 狀態的初始值設為 0：

**index.html**

```html
function HomePage() { // ... const [likes, setLikes] = React.useState(0); }
```

然後，您可以透過在元件內部使用狀態變數來檢查初始狀態是否正常運作。

**index.html**

```html
function HomePage() { // ... const [likes, setLikes] = React.useState(0); // ...
return ( // ...
<button onClick="{handleClick}">Like({likes})</button>
); }
```

最後，您可以在 `HomePage` 元件中呼叫您的狀態更新函式 `setLikes`，讓我們將它加到您先前定義的 `handleClick()` 函式中：

**index.html**

```html
function HomePage() { // ... const [likes, setLikes] = React.useState(0);
function handleClick() { setLikes(likes + 1); } return (
<div>
  {/* ... */}
  <button onClick="{handleClick}">Likes ({likes})</button>
</div>
); }
```

點擊按鈕現在將呼叫 `handleClick` 函式，該函式會呼叫 `setLikes` 狀態更新函式，並傳入目前的喜歡次數 `+ 1` 作為單一參數。

> **注意**：與作為第一個函式參數傳遞給元件的 props 不同，狀態是在元件內部初始化和儲存的。您可以將狀態資訊作為 props 傳遞給子元件，但更新狀態的邏輯應保留在最初建立狀態的元件中。

## 管理狀態

這只是對狀態的介紹，關於在 React 應用程式中管理狀態和資料流，您還可以學習更多。若要深入了解，我們建議您閱讀 React 文件中的[新增互動性](https://react.dev/learn/adding-interactivity)和[管理狀態](https://react.dev/learn/managing-state)部分。

## 額外資源：

- [狀態：元件的記憶體](https://react.dev/learn/state-a-components-memory)
- [認識您的第一個鉤子](https://react.dev/learn#meet-your-first-hook)
- [回應事件](https://react.dev/learn/responding-to-events)
