import { UpdateOfferRequest } from "../types/offer.types";
import { Institution } from "../../institutions/types/institution.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tag, Percent, FileText, CalendarDays, Building2 } from "lucide-react";
import { format } from "date-fns";

interface OfferEditFormProps {
    formData: UpdateOfferRequest;
    setFormData: (data: UpdateOfferRequest) => void;
    institutions: Institution[];
    institutionsLoading: boolean;
}

export function OfferEditForm({
    formData,
    setFormData,
    institutions,
    institutionsLoading,
}: OfferEditFormProps) {
    const formatDateForInput = (isoDate: string) => {
        if (!isoDate) return "";
        try {
            return format(new Date(isoDate), "yyyy-MM-dd");
        } catch {
            return "";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Title */}
            <div className="space-y-1.5">
                <Label htmlFor="title" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Title
                </Label>
                <div className="relative">
                    <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="h-10 pl-11 text-sm"
                        placeholder="Offer title"
                    />
                </div>
            </div>

            {/* Discount */}
            <div className="space-y-1.5">
                <Label htmlFor="discount" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Discount (%)
                </Label>
                <div className="relative">
                    <Percent className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                        id="discount"
                        type="number"
                        min={0}
                        max={100}
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                        className="h-10 pl-11 text-sm"
                        placeholder="29"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="description" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Description
                </Label>
                <div className="relative">
                    <FileText className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground/70" />
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="min-h-[80px] resize-none pl-11 pt-3 text-sm"
                        placeholder="Offer description"
                    />
                </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
                <Label htmlFor="startAt" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Start Date
                </Label>
                <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                        id="startAt"
                        type="date"
                        value={formatDateForInput(formData.startAt)}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                startAt: e.target.value ? new Date(e.target.value).toISOString() : "",
                            })
                        }
                        className="h-10 pl-11 text-sm"
                    />
                </div>
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
                <Label htmlFor="endAt" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    End Date
                </Label>
                <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                        id="endAt"
                        type="date"
                        value={formatDateForInput(formData.endAt)}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                endAt: e.target.value ? new Date(e.target.value).toISOString() : "",
                            })
                        }
                        className="h-10 pl-11 text-sm"
                    />
                </div>
            </div>

            {/* Institution */}
            <div className="space-y-1.5">
                <Label htmlFor="institutionId" className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Institution
                </Label>
                <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 z-10 pointer-events-none" />
                    <Select
                        value={formData.institutionId}
                        onValueChange={(val) => setFormData({ ...formData, institutionId: val })}
                        disabled={institutionsLoading}
                    >
                        <SelectTrigger className="h-10 pl-11 text-sm">
                            <SelectValue placeholder={institutionsLoading ? "Loading..." : "Select institution"} />
                        </SelectTrigger>
                        <SelectContent>
                            {institutions.map((inst) => (
                                <SelectItem key={inst.id} value={inst.id} className="text-sm">
                                    {inst.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Active Toggle */}
            <div className="space-y-1.5">
                <Label className="text-[13px] font-semibold text-slate-600 ml-0.5">
                    Status
                </Label>
                <div className="flex items-center gap-3 h-10 px-4 rounded-md border border-input bg-background">
                    <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                        id="isActive"
                    />
                    <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                        {formData.isActive ? "Active" : "Inactive"}
                    </Label>
                </div>
            </div>
        </div>
    );
}
