type DashboardPageProps = {
    children: React.ReactNode;
    className?: string;
    topbar?: React.ReactNode;
};

const DashboardPage: React.FC<DashboardPageProps> = ({
    children,
    className,
    topbar,
}) => {
    return (
        <section className={`dashboard-page ${className ?? ""}`.trim()}>
            {topbar}
            <div className="dashboard-page-content">{children}</div>
        </section>
    );
};

export default DashboardPage;
