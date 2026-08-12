import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { UserForm } from "@/modules/users/components/UserForm";
import { userService } from "@/modules/users/services/users.service";
import { CreateUserRequest } from "@/modules/users/types/users.types";
import { toast } from "sonner";
import { useState } from "react";
import { ROUTES } from "@/core/routes/paths";

export default function AddUser() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateUserRequest) => {
        setIsLoading(true);
        try {
            const response = await userService.createUser(data);
            if (response.success) {
                toast.success(response.message || "User created successfully");
                navigate(ROUTES.ADMINS);
            } else {
                toast.error(response.message || "Failed to create user");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error("Create user error:", error);
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
                            Add New Admin
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new platform administrator account.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
