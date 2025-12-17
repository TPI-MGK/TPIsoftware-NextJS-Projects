# 第十三章：提升可及性 (Accessibility)

在上一章中，我們探討了如何捕獲錯誤（包括 404 錯誤）並向使用者顯示備用 UI。然而，我們還需要討論另一塊拼圖：**表單驗證**。讓我們看看如何使用 Server Actions 實現伺服器端驗證，以及如何使用 React 的 `useActionState` hook 來處理表單錯誤並顯示給使用者——同時要考慮到可及性！

## 在本章中...

以下是我們將涵蓋的主題：

-   如何將 `eslint-plugin-jsx-a11y` 與 Next.js 結合使用，以實施可及性最佳實踐。
-   如何實現伺服器端表單驗證。
-   如何使用 React `useActionState` hook 來處理表單錯誤，並將其顯示給使用者。

## 什麼是可及性 (Accessibility)？

可及性指的是設計和實現人人都能使用的 Web 應用程式，包括那些有身心障礙的人士。這是一個涵蓋許多領域的廣泛主題，例如鍵盤導航、語義化 HTML、圖片、顏色、影片等。

雖然在本課程中我們不會深入探討可及性，但我們將討論 Next.js 中可用的可及性功能以及一些使您的應用程式更具可及性的常見實踐。

如果您想深入了解可及性，我們推薦 web.dev 的 [Learn Accessibility](https://web.dev/learn/accessibility) 課程。

## 在 Next.js 中使用 ESLint 可及性插件

Next.js 的 ESLint 配置包含了 `eslint-plugin-jsx-a11y` 插件，它有助於及早發現可及性問題。例如，如果您有沒有 `alt` 文本的圖片，或者不正確地使用了 `aria-*` 和 `role` 屬性，此插件會發出警告。

首先，安裝 ESLint：

```bash
pnpm add -D eslint eslint-config-next
```

接下來，在您專案的根目錄中建立一個名為 `eslint.config.mjs` 的檔案，內容如下：

`eslint.config.mjs`
```javascript
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
export default eslintConfig;
```

此配置使用了 `eslint-config-next/core-web-vitals`，其中包含了用於捕獲可及性問題的 `eslint-plugin-jsx-a11y` 插件。

現在，將一個 `lint` 腳本添加到您的 `package.json` 檔案中：

`/package.json`
```json
"scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start",
    "lint": "eslint ."
},
```

然後在您的終端機中運行 `pnpm lint`：

```bash
pnpm lint
```

如果沒有 linting 錯誤，ESLint 將在沒有任何輸出的情況下完成。然而，如果您有一個沒有 `alt` 文本的圖片會發生什麼？讓我們來看看！

前往 `/app/ui/invoices/table.tsx` 並從圖片中移除 `alt` 屬性。您可以使用編輯器的搜尋功能快速找到 `<Image>`：

`/app/ui/invoices/table.tsx`
```tsx
<Image
  src={invoice.image_url}
  className="rounded-full"
  width={28}
  height={28}
  alt={`${invoice.name}'s profile picture`} // 刪除此行
/>
```

現在再次運行 `pnpm lint`，您應該會看到以下警告：

```bash
./app/ui/invoices/table.tsx
45:25  Warning: Image elements must have an alt prop,
either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
```

雖然添加和配置 linter 不是必需的步驟，但它有助於在您的開發過程中捕獲可及性問題。

## 改善表單可及性

我們已經在表單中做了三件事來改善可及性：

1.  **語義化 HTML**：使用語義化元素（`<input>`、`<option>` 等）而不是 `<div>`。這允許輔助技術 (AT) 專注於輸入元素並向使用者提供適當的上下文資訊，使表單更易於導航和理解。
2.  **標籤**：包含 `<label>` 和 `htmlFor` 屬性確保每個表單欄位都有一個描述性的文字標籤。這通過提供上下文來改善 AT 的支援，並允許使用者點擊標籤以專注於相應的輸入欄位，從而增強了可用性。
3.  **焦點輪廓**：欄位被適當地設定樣式，以在它們處於焦點時顯示輪廓。這對於可及性至關重要，因為它在視覺上指示了頁面上的活動元素，幫助鍵盤和螢幕閱讀器使用者理解他們在表單上的位置。您可以按 `Tab` 鍵來驗證這一點。

這些實踐為使您的表單對許多使用者更具可及性奠定了良好的基礎。然而，它們沒有解決表單驗證和錯誤的問題。

## 表單驗證

前往 `http://localhost:3000/dashboard/invoices/create`，並提交一個空表單。發生了什麼事？

您得到了一個錯誤！這是因為您正在向您的 Server Action 發送空的表單值。您可以通過在客戶端或伺服器上驗證您的表單來防止這種情況。

### 客戶端驗證

您有幾種方式可以在客戶端驗證表單。最簡單的方法是依賴瀏覽器提供的表單驗證，只需在您的表單中的 `<input>` 和 `<select>` 元素上添加 `required` 屬性即可。例如：

`/app/ui/invoices/create-form.tsx`
```tsx
<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  required
/>
```

再次提交表單。如果您嘗試提交帶有空值的表單，瀏覽器將顯示一個警告。這種方法通常是可以的，因為一些輔助技術支援瀏覽器驗證。

### 伺服器端驗證

客戶端驗證的另一種選擇是伺服器端驗證。讓我們在下一節中看看如何實現它。現在，如果您添加了 `required` 屬性，請將其刪除。

通過在伺服器上驗證表單，您可以：
-   確保您的資料在發送到資料庫之前處於預期格式。
-   降低惡意使用者繞過客戶端驗證的風險。
-   對於什麼是有效資料，有一個單一的真理來源。

在您的 `create-form.tsx` 元件中，從 `react` 匯入 `useActionState` hook。由於 `useActionState` 是一個 hook，您需要使用 `"use client"` 指令將您的表單轉變為客戶端元件 (Client Component)：

`/app/ui/invoices/create-form.tsx`
```tsx
'use client';
 
// ...
import { useActionState } from 'react';
```

在您的 `Form` 元件內部，`useActionState` hook：
-   接受兩個參數：`(action, initialState)`。
-   返回兩個值：`[state, formAction]` - 表單狀態，以及一個在表單提交時要呼叫的函數。

將您的 `createInvoice` action 作為 `useActionState` 的參數傳遞，並在您的 `<form action={}>` 屬性中呼叫 `formAction`。

`/app/ui/invoices/create-form.tsx`
```tsx
// ...
import { useActionState } from 'react';
 
export default function Form({ customers }: { customers: CustomerField[] }) {
  const [state, formAction] = useActionState(createInvoice, initialState);
 
  return <form action={formAction}>...</form>;
}
```

`initialState` 可以是您定義的任何東西，在這種情況下，創建一個具有兩個空鍵的物件：`message` 和 `errors`，並從您的 `actions.ts` 檔案匯入 `State` 型別。`State` 尚不存在，但我們接下來會創建它：

`/app/ui/invoices/create-form.tsx`
```tsx
// ...
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
 
export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
 
  return <form action={formAction}>...</form>;
}
```

這最初可能看起來令人困惑，但一旦您更新了 server action，它就會變得更有意義。現在就來做吧。

在您的 `actions.ts` 檔案中，您可以使用 Zod 來驗證表單資料。如下更新您的 `FormSchema`：

`/app/lib/actions.ts`
```ts
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
```

-   **customerId** - Zod 已經在客戶欄位為空時拋出錯誤，因為它期望一個 `string` 型別。但讓我們為使用者未選擇客戶時添加一條友好的訊息。
-   **amount** - 由於您正在將 `amount` 的型別從字串強制轉換為數字，如果字串為空，它將預設為零。讓我們使用 `.gt()` 函數告訴 Zod 我們總是希望金額大於 0。
-   **status** - Zod 已經在狀態欄位為空時拋出錯誤，因為它期望 "pending" 或 "paid"。讓我們也為使用者未選擇狀態時添加一條友好的訊息。

接下來，更新您的 `createInvoice` action 以接受兩個參數 - `prevState` 和 `formData`：

`/app/lib/actions.ts`
```ts
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // ...
}
```
-   `formData` - 與之前相同。
-   `prevState` - 包含從 `useActionState` hook 傳遞的狀態。您在這個範例的 action 中不會使用它，但它是一個必需的 prop。

然後，將 Zod 的 `parse()` 函數更改為 `safeParse()`：
`/app/lib/actions.ts`
```ts
export async function createInvoice(prevState: State, formData: FormData) {
  // 使用 Zod 驗證表單欄位
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // ...
}
```

`safeParse()` 將返回一個包含 `success` 或 `error` 欄位的物件。這將有助於更優雅地處理驗證，而無需將此邏輯放入 `try/catch` 區塊中。

在將資訊發送到您的資料庫之前，用一個條件式檢查表單欄位是否已正確驗證：
`/app/lib/actions.ts`
```ts
export async function createInvoice(prevState: State, formData: FormData) {
  // ...
 
  // 如果表單驗證失敗，提早返回錯誤。否則，繼續。
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // ...
}
```

如果 `validatedFields` 不成功，我們將提早返回函數，並附上來自 Zod 的錯誤訊息。

> **提示**：`console.log(validatedFields)` 並提交一個空表單，以查看其形狀。

最後，由於您正在 `try/catch` 區塊之外單獨處理表單驗證，您可以為任何資料庫錯誤返回一個特定的訊息，您的最終程式碼應如下所示：
`/app/lib/actions.ts`
```ts
export async function createInvoice(prevState: State, formData: FormData) {
  // 使用 Zod 驗證表單
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // 如果表單驗證失敗，提早返回錯誤。否則，繼續。
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // 準備要插入資料庫的資料
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // 將資料插入資料庫
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // 如果發生資料庫錯誤，返回更具體的錯誤。
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // 為發票頁面重新驗證快取並重新導向使用者。
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```
很好，現在讓我們在您的表單元件中顯示錯誤。回到 `create-form.tsx` 元件，您可以使用表單狀態來存取錯誤。

添加一個三元運算符來檢查每個特定的錯誤。例如，在客戶欄位之後，您可以添加：

`/app/ui/invoices/create-form.tsx`
```tsx
<form action={formAction}>
  <div className="rounded-md bg-gray-50 p-4 md:p-6">
    {/* Customer Name */}
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Choose customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          //...
          aria-describedby="customer-error"
        >
          {/* ... */}
        </select>
        {/* ... */}
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    {/* ... */}
  </div>
</form>
```

> **提示**：您可以在您的元件內部 `console.log(state)` 並檢查一切是否連接正確。由於您的表單現在是客戶端元件，請檢查開發者工具中的控制台。

在上面的程式碼中，您還添加了以下 `aria` 標籤：

-   `aria-describedby="customer-error"`：這在 `select` 元素和錯誤訊息容器之間建立了一種關係。它表示 `id="customer-error"` 的容器描述了 `select` 元素。當使用者與選擇框互動時，螢幕閱讀器將讀取此描述以通知他們錯誤。
-   `id="customer-error"`：此 `id` 屬性唯一標識了保存 `select` 輸入錯誤訊息的 HTML 元素。這對於 `aria-describedby` 建立關係是必要的。
-   `aria-live="polite"`：當 `div` 內的錯誤更新時，螢幕閱讀器應禮貌地通知使用者。當內容更改時（例如，當使用者更正錯誤時），螢幕閱讀器將宣布這些更改，但只在使用者空閒時才宣布，以免打擾他們。

### 練習：添加 Aria 標籤

使用上面的範例，為您剩餘的表單欄位添加錯誤。您還應該在表單底部顯示一條訊息，如果有任何欄位缺失。您的 UI 應該看起來像這樣。

完成後，運行 `pnpm lint` 來檢查您是否正確使用了 `aria` 標籤。

如果您想挑戰自己，請將本章學到的知識應用到 `edit-form.tsx` 元件中，添加表單驗證。

您需要：
-   將 `useActionState` 添加到您的 `edit-form.tsx` 元件。
-   編輯 `updateInvoice` action 以處理來自 Zod 的驗證錯誤。
-   在您的元件中顯示錯誤，並添加 `aria` 標籤以改善可及性。

準備好後，展開下面的程式碼片段查看解決方案：

<details>
<summary>點此展開解決方案</summary>

**編輯發票表單：**

`/app/ui/invoices/edit-form.tsx`
```tsx
// ...
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
 
export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);
 
  return <form action={formAction}>{/* ... */}</form>;
}
```

**Server Action：**
`/app/lib/actions.ts`
```ts
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```
</details>
```