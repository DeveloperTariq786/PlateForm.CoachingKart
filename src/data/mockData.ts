export interface Institution {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive" | "pending";
  students: number;
  faculty: number;
  batches: number;
  programs: number;
  revenue: number;
  joinedDate: string;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Manager" | "Support";
  status: "active" | "inactive";
  avatar: string;
  lastActive: string;
  institution?: string;
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: string;
}

export const institutions: Institution[] = [
  {
    id: "inst-001",
    name: "Delhi Public School",
    owner: "Rajesh Kumar",
    email: "admin@dps.edu.in",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    status: "active",
    students: 1200,
    faculty: 48,
    batches: 12,
    programs: 6,
    revenue: 124000,
    joinedDate: "2024-03-15",
    logo: "DPS",
  },
  {
    id: "inst-002",
    name: "St. Xavier's College",
    owner: "Father Thomas",
    email: "principal@stxaviers.edu.in",
    phone: "+91 87654 32109",
    location: "Mumbai, India",
    status: "active",
    students: 980,
    faculty: 42,
    batches: 8,
    programs: 5,
    revenue: 98000,
    joinedDate: "2024-01-20",
    logo: "SXC",
  },
  {
    id: "inst-003",
    name: "Kendriya Vidyalaya",
    owner: "Dr. Meena Sharma",
    email: "kv.admin@kvs.gov.in",
    phone: "+91 76543 21098",
    location: "Bengaluru, India",
    status: "active",
    students: 850,
    faculty: 36,
    batches: 9,
    programs: 4,
    revenue: 76000,
    joinedDate: "2024-05-10",
    logo: "KV",
  },
  {
    id: "inst-004",
    name: "Amity International",
    owner: "Priya Patel",
    email: "info@amity.edu.in",
    phone: "+91 65432 10987",
    location: "Noida, India",
    status: "pending",
    students: 720,
    faculty: 28,
    batches: 6,
    programs: 3,
    revenue: 62000,
    joinedDate: "2025-01-05",
    logo: "AI",
  },
  {
    id: "inst-005",
    name: "Modern Academy",
    owner: "Suresh Reddy",
    email: "contact@modernacademy.in",
    phone: "+91 54321 09876",
    location: "Hyderabad, India",
    status: "active",
    students: 640,
    faculty: 18,
    batches: 4,
    programs: 3,
    revenue: 48000,
    joinedDate: "2024-08-22",
    logo: "MA",
  },
  {
    id: "inst-006",
    name: "Presidency School",
    owner: "Anita Singh",
    email: "admin@presidency.edu.in",
    phone: "+91 43210 98765",
    location: "Chennai, India",
    status: "inactive",
    students: 410,
    faculty: 12,
    batches: 3,
    programs: 2,
    revenue: 28000,
    joinedDate: "2024-06-18",
    logo: "PS",
  },
];

export const users: User[] = [
  { id: "u-001", name: "Arun Mehta", email: "arun@edusaas.com", role: "Super Admin", status: "active", avatar: "AM", lastActive: "2 min ago" },
  { id: "u-002", name: "Sneha Iyer", email: "sneha@edusaas.com", role: "Admin", status: "active", avatar: "SI", lastActive: "15 min ago", institution: "Delhi Public School" },
  { id: "u-003", name: "Vikram Joshi", email: "vikram@edusaas.com", role: "Manager", status: "active", avatar: "VJ", lastActive: "1 hour ago", institution: "St. Xavier's College" },
  { id: "u-004", name: "Kavita Nair", email: "kavita@edusaas.com", role: "Support", status: "active", avatar: "KN", lastActive: "30 min ago" },
  { id: "u-005", name: "Rohit Gupta", email: "rohit@edusaas.com", role: "Admin", status: "inactive", avatar: "RG", lastActive: "3 days ago", institution: "Modern Academy" },
  { id: "u-006", name: "Deepa Krishnan", email: "deepa@edusaas.com", role: "Manager", status: "active", avatar: "DK", lastActive: "5 min ago", institution: "Kendriya Vidyalaya" },
];

export const recentPayments = [
  { id: "pay-001", institution: "Delhi Public School", amount: 24500, date: "2026-02-22", status: "completed" },
  { id: "pay-002", institution: "St. Xavier's College", amount: 18200, date: "2026-02-21", status: "completed" },
  { id: "pay-003", institution: "Amity International", amount: 12800, date: "2026-02-20", status: "pending" },
  { id: "pay-004", institution: "Modern Academy", amount: 9600, date: "2026-02-19", status: "completed" },
  { id: "pay-005", institution: "Kendriya Vidyalaya", amount: 15400, date: "2026-02-18", status: "failed" },
];

export const supportTickets = [
  { id: "ticket-001", subject: "Login issue for faculty portal", institution: "Delhi Public School", priority: "high", status: "open", date: "2026-02-23" },
  { id: "ticket-002", subject: "Batch creation not working", institution: "St. Xavier's College", priority: "medium", status: "in-progress", date: "2026-02-22" },
  { id: "ticket-003", subject: "Report export failing", institution: "Modern Academy", priority: "low", status: "resolved", date: "2026-02-21" },
];

export const monthlyRevenue = [
  { month: "Sep", revenue: 52000 },
  { month: "Oct", revenue: 61000 },
  { month: "Nov", revenue: 58000 },
  { month: "Dec", revenue: 72000 },
  { month: "Jan", revenue: 68000 },
  { month: "Feb", revenue: 76000 },
];

export const studentGrowth = [
  { month: "Sep", students: 3800 },
  { month: "Oct", students: 4020 },
  { month: "Nov", students: 4180 },
  { month: "Dec", students: 4350 },
  { month: "Jan", students: 4580 },
  { month: "Feb", students: 4800 },
];
