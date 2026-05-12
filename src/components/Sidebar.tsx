import { SidebarButton } from "./Buttons";


export const Sidebar: React.FC = () => {

    const buttons = [
        { label: "Library", onClick: () => console.log("Library clicked") },
        { label: "Explore", onClick: () => console.log("Explore clicked") },
    ]

    return (
        <div className="flex column width-15 height flex-start sidebar">
            <div className="flex row width center">
                <h2 className="">STEVE</h2>
            </div>
            <div className="flex column width height gap-md">
                {buttons.map((button, index) => (
                    <SidebarButton
                        key={index}
                        label={button.label}
                        onClick={button.onClick}
                    />
                ))}
            </div>
        </div>
    );
};
