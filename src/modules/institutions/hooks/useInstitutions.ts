import { useState, useEffect } from "react";
import { Institution, InstitutionFilters, InstitutionStatus } from "../types/institution.types";
import { institutionService } from "../services/institution.service";
import { toast } from "sonner";

export function useInstitutions(initialStatus?: InstitutionStatus) {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<InstitutionStatus | undefined>(initialStatus);

    const fetchInstitutions = async (currentStatus?: InstitutionStatus) => {
        setIsLoading(true);
        try {
            const response = await institutionService.getInstitutions({ status: currentStatus });
            if (response.success) {
                setInstitutions(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch institutions", error);
            toast.error("An error occurred while fetching institutions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions(status);
    }, [status]);

    return { institutions, isLoading, status, setStatus, refresh: () => fetchInstitutions(status) };
}
