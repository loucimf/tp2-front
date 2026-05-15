type DashboardFeedbackCardProps = {
    copy: string;
    title: string;
    tone?: "default" | "error";
};

const DashboardFeedbackCard: React.FC<DashboardFeedbackCardProps> = ({
    copy,
    title,
    tone = "default",
}) => {
    return (
        <div
            className={`dashboard-feedback-card ${
                tone === "error" ? "dashboard-feedback-card-error" : ""
            }`.trim()}
        >
            <h3>{title}</h3>
            <p>{copy}</p>
        </div>
    );
};

export default DashboardFeedbackCard;
