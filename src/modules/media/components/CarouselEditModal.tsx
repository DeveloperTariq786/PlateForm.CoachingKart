import { useState, useEffect } from "react";
import { Type, FileText, MousePointerClick, Building2, ImagePlus } from "lucide-react";
import { Carousel, UpdateCarouselRequest } from "../types/carousel.types";
import { useInstitutions } from "@/modules/institutions/hooks/useInstitutions";
import { normalizeImageUrl } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";

interface CarouselEditModalProps {
    carousel: Carousel | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateCarouselRequest) => Promise<void>;
    isLoading?: boolean;
}

export function CarouselEditModal({
    carousel,
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
}: CarouselEditModalProps) {
    const { institutions, isLoading: institutionsLoading } = useInstitutions();
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        buttonText: string;
        institutionId: string;
        image: File | null;
    }>({
        title: "",
        description: "",
        buttonText: "",
        institutionId: "",
        image: null,
    });

    useEffect(() => {
        if (carousel) {
            setFormData({
                title: carousel.title || "",
                description: carousel.description || "",
                buttonText: carousel.buttonText || "",
                institutionId: carousel.institutionId || "",
                image: null,
            });
        }
    }, [carousel, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!carousel) return;

        await onSubmit(carousel.id, {
            title: formData.title,
            description: formData.description,
            buttonText: formData.buttonText,
            institutionId: formData.institutionId || undefined,
            image: formData.image,
        });
    };

    const fields: FormFieldConfig[] = [
        {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "Summer Camp",
            value: formData.title,
            onChange: (val) => setFormData((prev) => ({ ...prev, title: val })),
            required: true,
            icon: Type,
            colSpan: 1,
        },
        {
            id: "buttonText",
            label: "Button Text",
            type: "text",
            placeholder: "Learn More",
            value: formData.buttonText,
            onChange: (val) => setFormData((prev) => ({ ...prev, buttonText: val })),
            required: true,
            icon: MousePointerClick,
            colSpan: 1,
        },
        {
            id: "description",
            label: "Description",
            componentType: "textarea",
            placeholder: "Exciting summer camp details",
            value: formData.description,
            onChange: (val) => setFormData((prev) => ({ ...prev, description: val })),
            required: true,
            icon: FileText,
            colSpan: 2,
        },
        {
            id: "institutionId",
            label: "Institution (Optional)",
            componentType: "select",
            placeholder: institutionsLoading ? "Loading institutions..." : "Select an institution (optional)",
            value: formData.institutionId,
            onChange: (val) => setFormData((prev) => ({ ...prev, institutionId: val })),
            required: false,
            icon: Building2,
            colSpan: 2,
            disabled: institutionsLoading,
            options: institutions.map((inst) => ({
                label: inst.name,
                value: inst.id,
            })),
        },
        {
            id: "image",
            label: "Banner Image (Leave empty to keep current)",
            componentType: "file",
            value: formData.image,
            onChange: (val) => setFormData((prev) => ({ ...prev, image: val })),
            required: false,
            icon: ImagePlus,
            colSpan: 2,
            accept: "image/*",
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Carousel Slide</DialogTitle>
                    <DialogDescription>
                        Update the carousel details or upload a new banner image.
                    </DialogDescription>
                </DialogHeader>

                {carousel && !formData.image && carousel.image && (
                    <div className="space-y-1.5 px-1">
                        <p className="text-[13px] font-semibold text-slate-600">Current Image</p>
                        <div className="h-28 w-48 overflow-hidden rounded-lg border border-border bg-muted">
                            <img
                                src={normalizeImageUrl(carousel.image)}
                                alt={carousel.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <CommonForm
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText={isLoading ? "Updating Carousel..." : "Update Carousel"}
                    isLoading={isLoading}
                    className="space-y-5"
                    submitButtonClassName="w-full"
                />
            </DialogContent>
        </Dialog>
    );
}
