import DashboardIconButton from "./DashboardIconButton";
import DashboardSearchBar from "./DashboardSearchBar";

type DashboardTopbarProps = {
    inputId: string;
    onSearchChange: (value: string) => void;
    placeholder: string;
    value: string;
};

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
    inputId,
    onSearchChange,
    placeholder,
    value,
}) => {
    return (
        <header className="dashboard-topbar">
            <DashboardSearchBar
                inputId={inputId}
                onChange={onSearchChange}
                placeholder={placeholder}
                value={value}
            />

            <div className="dashboard-topbar-actions">
                <DashboardIconButton icon="bell" label="Notifications" />
                <DashboardIconButton icon="save" label="Saved games" />
            </div>
        </header>
    );
};

export default DashboardTopbar;
