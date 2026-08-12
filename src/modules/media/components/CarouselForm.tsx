import { Type, FileText, MousePointerClick, Building2, ImagePlus } from "lucide-react";
import { CreateCarouselRequest } from "../types/carousel.types";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useState } from "react";
import { useInstitutions } from "@/modules/institutions/hooks/useInstitutions";

interface CarouselFormProps {
    onSubmit: (data: CreateCarouselRequest) => void;
    isLoading?: boolean;
}

export function CarouselForm({ onSubmit, isLoading = false }: CarouselFormProps) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) return;
        onSubmit({
            title: formData.title,
            description: formData.description,
            buttonText: formData.buttonText,
            institutionId: formData.institutionId,
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
            onChange: (val) => setFormData({ ...formData, title: val }),
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
            onChange: (val) => setFormData({ ...formData, buttonText: val }),
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
            onChange: (val) => setFormData({ ...formData, description: val }),
            required: true,
            icon: FileText,
            colSpan: 2,
        },
        {
            id: "institutionId",
            label: "Institution",
            componentType: "select",
            placeholder: institutionsLoading ? "Loading institutions..." : "Select an institution",
            value: formData.institutionId,
            onChange: (val) => setFormData({ ...formData, institutionId: val }),
            required: true,
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
            label: "Banner Image",
            componentType: "file",
            value: formData.image,
            onChange: (val) => setFormData({ ...formData, image: val }),
            required: true,
            icon: ImagePlus,
            colSpan: 2,
            accept: "image/*",
        },
    ];

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText={isLoading ? "Creating Carousel..." : "Create Carousel"}
            isLoading={isLoading}
            className="space-y-5"
            submitButtonClassName="w-full"
        />
    );
}
