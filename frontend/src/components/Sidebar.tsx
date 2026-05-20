import type { User } from "@supabase/supabase-js";
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
    user: User | null;
};

function getUserDisplayName(user: User | null) {
    const metadataName =
        typeof user?.user_metadata?.name === "string"
            ? user.user_metadata.name
            : undefined;

    const rawName = metadataName ?? user?.email?.split("@")[0];

    if (rawName) {
        const simplifiedName = rawName
            .replace(/\d+/g, "")
            .split(/[\s._-]+/)
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(" ");

        if (simplifiedName) return simplifiedName;
    }

    return "Signed in";
}

function getUserInitials(name: string) {
    const parts = name
        .split(/[\s@._-]+/)
        .map((part) => part.trim())
        .filter(Boolean);

    return (parts[0]?.[0] ?? "U").toUpperCase()
        + (parts[1]?.[0] ?? "").toUpperCase();
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    buttons,
    onSectionChange,
    user,
}) => {
    const displayName = getUserDisplayName(user);
    const initials = getUserInitials(displayName);

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
                <div className="sidebar-profile-avatar">{initials}</div>
                <div className="sidebar-profile-copy">
                    <strong>{displayName}</strong>
                    <span>Member</span>
                </div>
            </div>
        </aside>
    );
};
