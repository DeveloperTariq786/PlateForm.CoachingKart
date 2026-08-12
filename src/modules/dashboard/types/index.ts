export interface DashboardStat {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: any;
  color: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface DashboardStatsResponse {
  institutions: number;
  courses: number;
  programs: number;
  centers: number;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  status: string;
  location: {
    city: string;
    address: string;
    country: string;
  };
  createdAt: string;
  _count: {
    courses: number;
    members: number;
    reviews: number;
  };
}
