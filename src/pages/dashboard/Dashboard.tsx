import { useEffect, useState } from "react";
import { StatsCards } from "@/modules/dashboard/components/StatsCards";
import { RecentInstitutionsList } from "@/modules/dashboard/components/RecentInstitutionsList";
import { getDashboardStats, getRecentInstitutions } from "@/modules/dashboard/services/dashboardService";
import { DashboardStat, Institution } from "@/modules/dashboard/types";
import { DashboardSkeleton } from "@/modules/dashboard/components/DashboardSkeleton";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [recentInstitutions, setRecentInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, institutionsData] = await Promise.all([
          getDashboardStats(),
          getRecentInstitutions(10)
        ]);
        setStats(statsData);
        setRecentInstitutions(institutionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="dashboard-title">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your platform performance
        </p>
      </div>

      {/* Stats Grid */}
      <StatsCards stats={stats} />

      {/* Recent Institutions */}
      <RecentInstitutionsList institutions={recentInstitutions} />
    </div>
  );
}
