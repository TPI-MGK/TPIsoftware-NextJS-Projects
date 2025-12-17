import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";

// --------------------------
// Mock Data
// --------------------------

const revenue: Revenue[] = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
];

const latestInvoicesRaw: LatestInvoiceRaw[] = [
  {
    id: "INV001",
    amount: 15795,
    name: "Lee Robinson",
    image_url: "/customers/lee-robinson.png",
    email: "lee@vercel.com",
  },
  {
    id: "INV002",
    amount: 20348,
    name: "Michael Novotny",
    image_url: "/customers/michael-novotny.png",
    email: "michael@novotny.com",
  },
  {
    id: "INV003",
    amount: 3040,
    name: "Amy Burns",
    image_url: "/customers/amy-burns.png",
    email: "amy@burns.com",
  },
  {
    id: "INV004",
    amount: 44800,
    name: "Balazs Orban",
    image_url: "/customers/balazs-orban.png",
    email: "balazs@orban.com",
  },
  {
    id: "INV005",
    amount: 34577,
    name: "Delba de Oliveira",
    image_url: "/customers/delba-de-oliveira.png",
    email: "delba@oliveira.com",
  },
];

const latestInvoices: LatestInvoice[] = latestInvoicesRaw.map((inv) => ({
  ...inv,
  amount: formatCurrency(inv.amount),
}));

const cardData = {
  numberOfInvoices: 48,
  numberOfCustomers: 12,
  totalPaidInvoices: formatCurrency(452345),
  totalPendingInvoices: formatCurrency(12456),
};

const allInvoices: InvoicesTable[] = [
  {
    id: "INV001",
    customer_id: "cust_1",
    amount: 15795,
    date: "2024-12-15",
    status: "paid",
    name: "Lee Robinson",
    email: "lee@vercel.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    id: "INV002",
    customer_id: "cust_2",
    amount: 20348,
    date: "2024-12-10",
    status: "pending",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
  },
  {
    id: "INV003",
    customer_id: "cust_3",
    amount: 3040,
    date: "2024-12-05",
    status: "paid",
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
  },
  {
    id: "INV004",
    customer_id: "cust_4",
    amount: 44800,
    date: "2024-11-28",
    status: "pending",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
  },
  {
    id: "INV005",
    customer_id: "cust_5",
    amount: 34577,
    date: "2024-11-20",
    status: "paid",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    id: "INV006",
    customer_id: "cust_1",
    amount: 12500,
    date: "2024-11-15",
    status: "paid",
    name: "Lee Robinson",
    email: "lee@vercel.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    id: "INV007",
    customer_id: "cust_6",
    amount: 8900,
    date: "2024-11-10",
    status: "pending",
    name: "John Doe",
    email: "john@example.com",
    image_url: "/customers/john-doe.png",
  },
  {
    id: "INV008",
    customer_id: "cust_7",
    amount: 5600,
    date: "2024-11-05",
    status: "paid",
    name: "Jane Smith",
    email: "jane@example.com",
    image_url: "/customers/jane-smith.png",
  },
];

const customers: CustomerField[] = [
  { id: "cust_1", name: "Lee Robinson" },
  { id: "cust_2", name: "Michael Novotny" },
  { id: "cust_3", name: "Amy Burns" },
  { id: "cust_4", name: "Balazs Orban" },
  { id: "cust_5", name: "Delba de Oliveira" },
  { id: "cust_6", name: "John Doe" },
  { id: "cust_7", name: "Jane Smith" },
];

// 用於 Customers 頁面的 mock data
const customersTableRaw: CustomersTableType[] = [
  {
    id: "cust_1",
    name: "Lee Robinson",
    email: "lee@vercel.com",
    image_url: "/customers/lee-robinson.png",
    total_invoices: 8,
    total_pending: 15795,
    total_paid: 300000,
  },
  {
    id: "cust_2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
    total_invoices: 6,
    total_pending: 20348,
    total_paid: 180000,
  },
  {
    id: "cust_3",
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
    total_invoices: 4,
    total_pending: 0,
    total_paid: 45000,
  },
  {
    id: "cust_4",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
    total_invoices: 5,
    total_pending: 44800,
    total_paid: 120000,
  },
  {
    id: "cust_5",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
    total_invoices: 7,
    total_pending: 0,
    total_paid: 280000,
  },
];

// --------------------------
// Adjusted Functions
// --------------------------

export async function fetchRevenue() {
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  return revenue;
}

export async function fetchLatestInvoices() {
  return latestInvoices;
}

export async function fetchCardData() {
  return cardData;
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  let filtered = allInvoices;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = allInvoices.filter(
      (inv) =>
        inv.name.toLowerCase().includes(lowerQuery) ||
        inv.email.toLowerCase().includes(lowerQuery) ||
        inv.amount.toString().includes(lowerQuery) ||
        inv.date.includes(lowerQuery) ||
        inv.status.includes(lowerQuery)
    );
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function fetchInvoicesPages(query: string) {
  let count = allInvoices.length;

  if (query) {
    const lowerQuery = query.toLowerCase();
    const filtered = allInvoices.filter(
      (inv) =>
        inv.name.toLowerCase().includes(lowerQuery) ||
        inv.email.toLowerCase().includes(lowerQuery) ||
        inv.amount.toString().includes(lowerQuery) ||
        inv.date.includes(lowerQuery) ||
        inv.status.includes(lowerQuery)
    );
    count = filtered.length;
  }

  return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function fetchInvoiceById(id: string) {
  const found = allInvoices.find((inv) => inv.id === id);
  if (!found) return undefined;

  return {
    id: found.id,
    customer_id: found.customer_id,
    amount: found.amount / 100, // 轉成 dollars
    status: found.status,
  };
}

export async function fetchCustomers() {
  return customers;
}

export async function fetchFilteredCustomers(query: string) {
  let filtered = customersTableRaw;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = customersTableRaw.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery)
    );
  }

  // 直接 map 轉換成畫面需要的 string 格式
  return filtered.map((customer) => ({
    ...customer,
    total_pending: formatCurrency(customer.total_pending),
    total_paid: formatCurrency(customer.total_paid),
  }));
}
