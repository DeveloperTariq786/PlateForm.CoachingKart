import { MousePointerClick, Building2, ImagePlus } from "lucide-react";
import { CreateAdRequest } from "../types/ads.types";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useState } from "react";
import { useInstitutions } from "@/modules/institutions/hooks/useInstitutions";

interface AdFormProps {
    onSubmit: (data: CreateAdRequest) => void;
    isLoading?: boolean;
}

export function AdForm({ onSubmit, isLoading = false }: AdFormProps) {
    const { institutions, isLoading: institutionsLoading } = useInstitutions();
    const [formData, setFormData] = useState<{
        buttonText: string;
        institutionId: string;
        image: File | null;
    }>({
        buttonText: "",
        institutionId: "",
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) return;
        onSubmit({
            buttonText: formData.buttonText,
            institutionId: formData.institutionId,
            image: formData.image,
        });
    };

    const fields: FormFieldConfig[] = [
        {
            id: "buttonText",
            label: "Button Text",
            type: "text",
            placeholder: "Learn More",
            value: formData.buttonText,
            onChange: (val) => setFormData({ ...formData, buttonText: val }),
            required: true,
            icon: MousePointerClick,
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
            label: "Ad Banner Image",
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
            submitButtonText={isLoading ? "Creating Ad..." : "Create Ad"}
            isLoading={isLoading}
            className="space-y-5"
            submitButtonClassName="w-full"
        />
    );
}
