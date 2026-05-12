import { SidebarButton } from "./Buttons";

type SidebarProps = {
    label: string;
    onClick?: () => void;
    content: React.ReactNode;
};

export const Sidebar: React.FC<{ buttons: SidebarProps[] }> = ({ buttons }) => {



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
