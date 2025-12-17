# 第 6 章：使用 Props 顯示資料

到目前為止，如果您要重複使用 `<Header />` 元件，它兩次都會顯示相同的內容。

**index.html**
```html
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}
 
function HomePage() {
  return (
    <div>
      <Header />
      <Header />
    </div>
  );
}
```

但是，如果您想傳遞不同的文字，或者因為您是從外部來源獲取資料而無法預先知道資訊，該怎麼辦？
常規的 HTML 元素具有**屬性 (attributes)**，您可以用來傳遞改變這些元素行為的資訊。例如，更改 `<img>` 元素的 `src` 屬性會更改顯示的圖片。更改 `<a>` 標籤的 `href` 屬性會更改連結的目的地。
同樣地，您可以將資訊作為**屬性 (properties)** 傳遞給 React 元件。這些被稱為 **props**。以按鈕的可能變化為例：

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Fdark%2Flearn-props.png&w=3840&q=75)

與 JavaScript 函式類似，您可以設計接受自訂參數（或 props）的元件，這些參數會改變元件的行為或在渲染到螢幕上時顯示的內容。然後，您可以將這些 props 從父元件向下傳遞給子元件。
> **注意**：在 React 中，資料沿著元件樹向下流動。這被稱為**單向資料流**。狀態（將在下一章討論）可以作為 props 從父元件傳遞給子元件。

## 使用 props
在您的 `HomePage` 元件中，您可以將自訂的 `title` prop 傳遞給 `Header` 元件，就像您傳遞 HTML 屬性一樣：

**index.html**
```html
function HomePage() {
  return (
    <div>
      <Header title="React" />
    </div>
  );
}
```

而 `Header`，作為子元件，可以接受這些 props 作為其第一個函式參數：

**index.html**
```html
function Header(props) {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

如果您 `console.log(props)`，您可以看到它是一個具有 `title` 屬性的物件。

**index.html**
```html
function Header(props) {
  console.log(props); // { title: "React" }
  return <h1>Develop. Preview. Ship.</h1>;
}
```

由於 `props` 是一個物件，您可以使用**物件解構**在函式參數中明確命名 `props` 的值：

**index.html**
```html
function Header({ title }) {
  console.log(title); // "React"
  return <h1>Develop. Preview. Ship.</h1>;
}
```

然後您可以將 `<h1>` 標籤的內容替換為您的 `title` 變數。

**index.html**
```html
function Header({ title }) {
  console.log(title);
  return <h1>title</h1>;
}
```

如果您在瀏覽器中開啟檔案，您會看到它顯示的是實際的單字 "title"。這是因為 React 認為您打算將純文字字串渲染到 DOM。
您需要一種方法來告訴 React 這是一個 JavaScript 變數。

## 在 JSX 中使用變數
要使用 `title` prop，請加上大括號 `{}`。這是一種特殊的 JSX 語法，允許您直接在 JSX 標記內部編寫常規的 JavaScript。

**index.html**
```html
function Header({ title }) {
  console.log(title);
  return <h1>{title}</h1>;
}
```

您可以將大括號想像成在「JSX 領域」時進入「JavaScript 領域」的一種方式。您可以在大括號內新增任何 JavaScript **運算式**（評估為單一值的東西）。例如：

- 使用點記法的物件屬性：
**example.js**
```javascript
function Header(props) {
  return <h1>{props.title}</h1>;
}
```

- 樣板字面值：
**example.js**
```javascript
function Header({ title }) {
  return <h1>{`Cool ${title}`}</h1>;
}
```

- 函式的回傳值：
**example.js**
```javascript
function createTitle(title) {
  if (title) {
    return title;
  } else {
    return 'Default title';
  }
}
 
function Header({ title }) {
  return <h1>{createTitle(title)}</h1>;
}
```

- 或三元運算子：
**example.js**
```javascript
function Header({ title }) {
  return <h1>{title ? title : 'Default Title'}</h1>;
}
```

您現在可以將任何字串傳遞給您的 `title` prop，或者，如果您使用了三元運算子，您甚至可以完全不傳遞 `title` prop，因為您已經在元件中考慮了預設情況：

**example.js**
```javascript
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

您的元件現在接受一個通用的 `title` prop，您可以在應用程式的不同部分重複使用它。您需要做的就是更改 `title` 字串：

**index.html**
```html
function HomePage() {
  return (
    <div>
      <Header title="React" />
      <Header title="A new title" />
    </div>
  );
}
```

## 遍歷列表
通常您需要將資料顯示為列表。您可以使用陣列方法來操作您的資料並產生樣式相同但包含不同資訊的 UI 元素。
將以下名稱陣列新增到您的 `HomePage` 元件中：

**index.html**
```html
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

然後您可以使用 `array.map()` 方法來遍歷陣列，並使用箭頭函式將名稱對應到列表項目：

**index.html**
```html
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

請注意您如何使用大括號在「JavaScript」和「JSX」領域之間切換。
如果您執行此程式碼，React 會給我們一個關於缺少 `key` prop 的警告。這是因為 React 需要唯一識別陣列中的項目，以便知道要在 DOM 中更新哪些元素。
您暫時可以使用名稱，因為它們目前是唯一的，但建議使用保證唯一的東西，例如項目 ID。

**index.html**
```html
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 額外資源：
- [將 props 傳遞給元件](https://react.dev/learn/passing-props-to-a-component)
- [渲染列表](https://react.dev/learn/rendering-lists)
- [條件渲染](https://react.dev/learn/conditional-rendering)