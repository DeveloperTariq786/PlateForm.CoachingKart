import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AdForm } from "@/modules/media/components/AdForm";
import { adsService } from "@/modules/media/services/ads.service";
import { CreateAdRequest } from "@/modules/media/types/ads.types";
import { toast } from "sonner";
import { useState } from "react";
import { ROUTES } from "@/core/routes/paths";

export default function AddAd() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateAdRequest) => {
        setIsLoading(true);
        try {
            const response = await adsService.createAd(data);
            if (response.success) {
                toast.success(response.message || "Ad created successfully");
                navigate(ROUTES.MEDIA_ADS);
            } else {
                toast.error(response.message || "Failed to create ad");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error("Create ad error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-120px)] w-full flex-col justify-center py-8 animate-fade-in">
            <div className="mx-auto w-full max-w-2xl space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-foreground">
                            Add New Ad
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new advertisement banner.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <AdForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
