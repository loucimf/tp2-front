type DashboardSectionHeaderProps = {
    actions?: React.ReactNode;
    copy: string;
    title: string;
};

const DashboardSectionHeader: React.FC<DashboardSectionHeaderProps> = ({
    actions,
    copy,
    title,
}) => {
    return (
        <div className="dashboard-section-header">
            <div>
                <h2>{title}</h2>
                <p>{copy}</p>
            </div>
            {actions ? <div className="dashboard-section-actions">{actions}</div> : null}
        </div>
    );
};

export default DashboardSectionHeader;
