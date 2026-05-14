type ExploreFeedbackCardProps = {
    copy: string;
    title: string;
    tone?: "default" | "error";
};

const ExploreFeedbackCard: React.FC<ExploreFeedbackCardProps> = ({
    copy,
    title,
    tone = "default",
}) => {
    return (
        <div
            className={`explore-feedback-card ${
                tone === "error" ? "explore-feedback-card-error" : ""
            }`.trim()}
        >
            <h3>{title}</h3>
            <p>{copy}</p>
        </div>
    );
};

export default ExploreFeedbackCard;
