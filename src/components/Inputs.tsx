

export const TextInput: React.FC<{
    autoComplete?: string;
    disabled?: boolean;
    error?: string;
    hint?: string;
    id?: string;
    type: "text" | "password" | "email";
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}> = ({ autoComplete, disabled = false, error, hint, id, type, label, value, placeholder, onChange }) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="width input-field">
            <label className="input-label" htmlFor={inputId}>
                {label}
            </label>
            <input
                autoComplete={autoComplete}
                disabled={disabled}
                id={inputId}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input width"
                aria-invalid={Boolean(error)}
                aria-describedby={hint || error ? `${inputId}-meta` : undefined}
            />
            {(hint || error) && (
                <p
                    id={`${inputId}-meta`}
                    className={`input-meta ${error ? "input-meta-error" : ""}`}
                >
                    {error ?? hint}
                </p>
            )}
        </div>
    );
};

export default TextInput;
