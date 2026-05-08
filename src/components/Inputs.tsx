

export const TextInput: React.FC<{
    type: "text" | "password" | "email";
    label: string;
    value: string;
    onChange: (value: string) => void;
}> = ({ type, label, value, onChange }) => {
    return (
        <div className="input-group">
            <input
                placeholder={label}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
        </div>
    );
};

export default TextInput;