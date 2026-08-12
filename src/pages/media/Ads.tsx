import { useNavigate } from "react-router-dom";
import { useAds } from "@/modules/media/hooks/useAds";
import { AdsTable } from "@/modules/media/components/AdsTable";
import { RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/core/routes/paths";

export default function Ads() {
    const navigate = useNavigate();
    const { ads, isLoading, refresh } = useAds();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="ads-title">
                        Ads
                    </h1>
                    <p className="text-sm text-muted-foreground">Manage advertisements and promotions</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={refresh}
                        disabled={isLoading}
                        data-testid="ads-refresh-btn"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => navigate(ROUTES.MEDIA_ADS_ADD)}
                        data-testid="ads-add-btn"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ad
                    </Button>
                </div>
            </div>

            <AdsTable data={ads} isLoading={isLoading} />
        </div>
    );
}
