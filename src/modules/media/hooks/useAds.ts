import { useState, useEffect } from "react";
import { Ad } from "../types/ads.types";
import { adsService } from "../services/ads.service";
import { toast } from "sonner";

export function useAds() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAds = async () => {
        setIsLoading(true);
        try {
            const response = await adsService.getAds();
            if (response.success) {
                setAds(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch ads", error);
            toast.error("An error occurred while fetching advertisements");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return { ads, isLoading, refresh: fetchAds };
}
