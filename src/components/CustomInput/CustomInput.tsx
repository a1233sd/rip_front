import { FormGroup, Input, Label } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";

type CustomInputProps = {
    label: string;
    placeholder?: string; 
    value: string;
    setValue: (value: string) => void;
    disabled: boolean;
    required?: boolean;
    error?: boolean;
    valid?: boolean;
    type?: InputType;
};

export const CustomInput = ({
    label,
    placeholder = "", // Значение по умолчанию
    value,
    setValue,
    disabled,
    required = true,
    error = false,
    valid = false,
    type = "text",
}: CustomInputProps) => {
    return (
        <FormGroup>
            <Label>{label}</Label>
            <Input
                placeholder={placeholder}
                className="w-100"
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                invalid={error}
                disabled={disabled}
                required={required}
                valid={valid}
            />
        </FormGroup>
    );
};
