import { useState, useEffect } from "react";
import { Offer } from "../types/offer.types";
import { offerService } from "../services/offer.service";
import { toast } from "sonner";

export function useOffer() {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOffer = async () => {
        setIsLoading(true);
        try {
            const response = await offerService.getOffers();
            if (response.success && response.data.length > 0) {
                setOffer(response.data[0]);
            } else {
                setOffer(null);
            }
        } catch (error) {
            console.error("Failed to fetch offer", error);
            toast.error("An error occurred while fetching the offer");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOffer();
    }, []);

    return { offer, isLoading, refresh: fetchOffer };
}
