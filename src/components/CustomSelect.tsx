import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "./ui/select";

type CustomSelectProps<T> = {
  value: T;
  onValueChange: (value: T) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  options: Array<{ value: T; label: string }>;
};

const CustomSelect = <T extends string>({
  label,
  placeholder,
  value,
  onValueChange,
  options,
  disabled,
}: CustomSelectProps<T>) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
