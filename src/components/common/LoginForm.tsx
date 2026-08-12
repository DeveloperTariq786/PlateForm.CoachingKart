import { Mail, Lock } from "lucide-react";
import CommonForm, { FormFieldConfig } from "./CommonForm";

interface LoginFormProps {
  email: string;
  password: string;
  remember: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberChange: (remember: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function LoginForm({
  email,
  password,
  remember,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const fields: FormFieldConfig[] = [
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "admin@edusaas.com",
      value: email,
      onChange: onEmailChange,
      required: true,
      icon: Mail,
      colSpan: 2,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      value: password,
      onChange: onPasswordChange,
      required: true,
      icon: Lock,
      colSpan: 2,
    },
  ];

  return (
    <CommonForm
      fields={fields}
      onSubmit={onSubmit}
      submitButtonText={isLoading ? "Signing in..." : "Sign In"}
      isLoading={isLoading}
      className="space-y-5"
      submitButtonClassName="w-full"
    >
      {/* Remember / Forgot */}
      <div className="flex items-center justify-between -mt-4">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => onRememberChange(e.target.checked)}
            disabled={isLoading}
            className="h-4 w-4 rounded border-input accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
          />
          Remember me
        </label>
        <button
          type="button"
          disabled={isLoading}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Forgot password?
        </button>
      </div>
    </CommonForm>
  );
}
