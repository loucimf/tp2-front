import SysIcon from "../Icon";
import DashboardIconButton from "./DashboardIconButton";

type DashboardSearchBarProps = {
    inputId: string;
    onChange: (value: string) => void;
    placeholder: string;
    value: string;
};

const DashboardSearchBar: React.FC<DashboardSearchBarProps> = ({
    inputId,
    onChange,
    placeholder,
    value,
}) => {
    return (
        <div className="dashboard-searchbar">
            <label className="dashboard-search-input" htmlFor={inputId}>
                <SysIcon type="explore" className="dashboard-search-icon" />
                <input
                    id={inputId}
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                />
            </label>

            <DashboardIconButton icon="filter" label="Open filters" />
        </div>
    );
};

export default DashboardSearchBar;
