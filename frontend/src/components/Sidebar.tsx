import { SidebarButton } from "./Buttons";

interface SidebarButtonProps {
    label: string;
    onClick?: () => void;
}

type SidebarProps = {
    buttons: SidebarButtonProps[];
    class_width: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ buttons, class_width }) => {

    return (
        <div className={`flex column ${class_width} height flex-start sidebar`}>
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
