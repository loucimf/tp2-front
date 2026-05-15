import { SidebarButton } from "./Buttons";
import SysIcon, { SVGIcons } from "./Icon";

export type SidebarSection = "explore" | "library" | "trending" | "offers";

export interface SidebarButtonProps {
    id: SidebarSection;
    icon: SVGIcons;
    label: string;
}

type SidebarProps = {
    activeSection: SidebarSection;
    buttons: SidebarButtonProps[];
    onSectionChange: (section: SidebarSection) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    buttons,
    onSectionChange,
}) => {
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-brand-mark">
                    <SysIcon type="play" className="sidebar-brand-icon" />
                </div>
                <div className="sidebar-brand-copy">
                    <span className="sidebar-brand-name">Nexus</span>
                    <span className="sidebar-brand-name">Games</span>
                </div>
            </div>

            <nav className="sidebar-nav" aria-label="Primary">
                {buttons.map((button) => (
                    <SidebarButton
                        key={button.id}
                        className={button.id === activeSection ? "active" : ""}
                        icon={button.icon}
                        label={button.label}
                        onClick={() => onSectionChange(button.id)}
                    />
                ))}
            </nav>

            <div className="sidebar-profile-card">
                <div className="sidebar-profile-avatar">AJ</div>
                <div className="sidebar-profile-copy">
                    <strong>Alex Johnson</strong>
                    <span>Pro Member</span>
                </div>
            </div>
        </aside>
    );
};
