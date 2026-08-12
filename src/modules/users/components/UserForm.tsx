import { Mail, Lock, User, ShieldCheck } from "lucide-react";
import { CreateUserRequest } from "../types/users.types";
import { PlatformRole } from "@/modules/auth/types/auth.types";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useState } from "react";

interface UserFormProps {
    onSubmit: (data: CreateUserRequest) => void;
    isLoading?: boolean;
    initialData?: Partial<CreateUserRequest>;
}

export function UserForm({
    onSubmit,
    isLoading = false,
    initialData = {},
}: UserFormProps) {
    const [formData, setFormData] = useState<CreateUserRequest>({
        name: initialData.name || "",
        email: initialData.email || "",
        password: initialData.password || "",
        platformRole: initialData.platformRole || "PLATFORM_ADMIN",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const fields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Full Name",
            type: "text",
            placeholder: "John Doe",
            value: formData.name,
            onChange: (val) => setFormData({ ...formData, name: val }),
            required: true,
            icon: User,
            colSpan: 2,
        },
        {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "john@example.com",
            value: formData.email,
            onChange: (val) => setFormData({ ...formData, email: val }),
            required: true,
            icon: Mail,
            colSpan: 2,
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            value: formData.password,
            onChange: (val) => setFormData({ ...formData, password: val }),
            required: true,
            icon: Lock,
            colSpan: 2,
        },
        {
            id: "platformRole",
            label: "Platform Role",
            componentType: "select",
            value: formData.platformRole,
            onChange: (val) => setFormData({ ...formData, platformRole: val as PlatformRole }),
            required: true,
            icon: ShieldCheck,
            colSpan: 2,
            options: [
                { label: "Platform Admin", value: "PLATFORM_ADMIN" },
                { label: "Platform Super Admin", value: "PLATFORM_SUPER_ADMIN" },
            ],
        },
    ];

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText={isLoading ? "Creating User..." : "Create User"}
            isLoading={isLoading}
            className="space-y-5"
            submitButtonClassName="w-full"
        />
    );
}
