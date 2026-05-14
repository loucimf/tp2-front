import { SidebarButton } from "./Buttons";
import { SVGIcons } from "./Icon";

export interface SidebarButtonProps {
    icon: SVGIcons;
    label: string;
    onClick?: () => void;
    content: React.ReactNode;
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
                        icon={button.icon}
                    />
                ))}
            </div>
        </div>
    );
};
