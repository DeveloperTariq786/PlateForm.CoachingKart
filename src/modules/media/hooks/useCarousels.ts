import { useState, useEffect } from "react";
import { Carousel } from "../types/carousel.types";
import { carouselService } from "../services/carousel.service";
import { toast } from "sonner";

export function useCarousels() {
    const [carousels, setCarousels] = useState<Carousel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCarousels = async () => {
        setIsLoading(true);
        try {
            const response = await carouselService.getCarousels();
            if (response.success) {
                setCarousels(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch carousels", error);
            toast.error("An error occurred while fetching carousels");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCarousels();
    }, []);

    return { carousels, isLoading, refresh: fetchCarousels };
}
