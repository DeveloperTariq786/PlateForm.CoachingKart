import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarousels } from "@/modules/media/hooks/useCarousels";
import { CarouselTable } from "@/modules/media/components/CarouselTable";
import { CarouselEditModal } from "@/modules/media/components/CarouselEditModal";
import { carouselService } from "@/modules/media/services/carousel.service";
import { Carousel as CarouselType, UpdateCarouselRequest } from "@/modules/media/types/carousel.types";
import { RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/core/routes/paths";
import { toast } from "sonner";

export default function Carousel() {
    const navigate = useNavigate();
    const { carousels, isLoading, refresh } = useCarousels();
    const [editingCarousel, setEditingCarousel] = useState<CarouselType | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async (id: string, data: UpdateCarouselRequest) => {
        setIsUpdating(true);
        try {
            const response = await carouselService.updateCarousel(id, data);
            if (response.success) {
                toast.success(response.message || "Carousel updated successfully");
                setEditingCarousel(null);
                refresh();
            } else {
                toast.error(response.message || "Failed to update carousel");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred while updating carousel";
            toast.error(errorMessage);
            console.error("Update carousel error:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const response = await carouselService.deleteCarousel(id);
            if (response.success) {
                toast.success(response.message || "Carousel deleted successfully");
                refresh();
            } else {
                toast.error(response.message || "Failed to delete carousel");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred while deleting carousel";
            toast.error(errorMessage);
            console.error("Delete carousel error:", error);
        } finally {
            setIsDeleting(false);
        }
    };

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

            <CarouselTable
                data={carousels}
                isLoading={isLoading}
                onEdit={(item) => setEditingCarousel(item)}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />

            <CarouselEditModal
                carousel={editingCarousel}
                isOpen={!!editingCarousel}
                onClose={() => setEditingCarousel(null)}
                onSubmit={handleUpdate}
                isLoading={isUpdating}
            />
        </div>
    );
}
