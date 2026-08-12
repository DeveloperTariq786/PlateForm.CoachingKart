import { useNavigate } from "react-router-dom";
import { useCarousels } from "@/modules/media/hooks/useCarousels";
import { CarouselTable } from "@/modules/media/components/CarouselTable";
import { RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/core/routes/paths";

export default function Carousel() {
    const navigate = useNavigate();
    const { carousels, isLoading, refresh } = useCarousels();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="carousel-title">
                        Carousel
                    </h1>
                    <p className="text-sm text-muted-foreground">Manage carousel banners and slides</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={refresh}
                        disabled={isLoading}
                        data-testid="carousel-refresh-btn"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => navigate(ROUTES.MEDIA_CAROUSEL_ADD)}
                        data-testid="carousel-add-btn"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Carousel
                    </Button>
                </div>
            </div>

            <CarouselTable data={carousels} isLoading={isLoading} />
        </div>
    );
}
