import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputField({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        className={error ? "border-red-500 focus:ring-red-500" : ""}
      />
    </div>
  );
}
