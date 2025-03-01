export interface FormInputProps {
    name: string;
    type?: string;
    value: any;
    placeholder?: string;
    handleInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    errorMsg?:string;
}

export function FormInput({name, type = "text", value, placeholder, handleInputBlur, 
                           handleInputChange, required = false, errorMsg}: FormInputProps) {    
    return (
        <div>
            <label>{name} {required ? <span style={{color:"red"}}>*</span> : ""}</label>
            <input type={type} 
                    name={name} 
                    id={name} 
                    value={value} 
                    placeholder={placeholder}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange} 
                    required={required} />

            <div className="control-error">
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        </div>
    )
}
