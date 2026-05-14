type ExplorePanelHeadingProps = {
    actions?: React.ReactNode;
    copy: string;
    title: string;
};

const ExplorePanelHeading: React.FC<ExplorePanelHeadingProps> = ({
    actions,
    copy,
    title,
}) => {
    return (
        <div className="explore-panel-heading">
            <div>
                <h2>{title}</h2>
                <p>{copy}</p>
            </div>
            {actions ? <div className="explore-panel-controls">{actions}</div> : null}
        </div>
    );
};

export default ExplorePanelHeading;
