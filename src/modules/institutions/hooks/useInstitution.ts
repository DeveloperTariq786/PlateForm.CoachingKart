import { useState, useEffect } from "react";
import { InstitutionDetail } from "../types/institution.types";
import { institutionService } from "../services/institution.service";
import { toast } from "sonner";

export function useInstitution(id?: string) {
    const [institution, setInstitution] = useState<InstitutionDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInstitution = async (idToFetch: string) => {
        setIsLoading(true);
        try {
            const response = await institutionService.getInstitutionById(idToFetch);
            if (response.success) {
                setInstitution(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch institution details", error);
            toast.error("An error occurred while fetching institution details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchInstitution(id);
        }
    }, [id]);

    return { institution, isLoading, refresh: () => id && fetchInstitution(id) };
}
