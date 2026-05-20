type DashboardSelectOption = {
    label: string;
    value: string;
};

type DashboardSelectControlProps = {
    label: string;
    onChange: (value: string) => void;
    options: DashboardSelectOption[];
    value: string;
};

const DashboardSelectControl: React.FC<DashboardSelectControlProps> = ({
    label,
    onChange,
    options,
    value,
}) => {
    return (
        <label className="dashboard-select-control">
            <span>{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default DashboardSelectControl;
