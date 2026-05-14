import type { SVGProps } from "react";
import { ReactComponent as ExploreIcon } from "../assets/svgs/explore.svg?react";
import { ReactComponent as LibraryIcon } from "../assets/svgs/library.svg?react";
import { ReactComponent as OffersIcon } from "../assets/svgs/offers.svg?react";

export type SVGIcons = "explore" | "offer" | "library";
type IconProps = {
    type: SVGIcons;
    className?: string;
};

const iconProps: SVGProps<SVGSVGElement> = {
    "aria-hidden": true,
    focusable: "false",
};

const SysIcon: React.FC<IconProps> = ({ type, className }) => {
    switch (type) {
        case "explore":
            return <ExploreIcon {...iconProps} className={className} />;
        case "offer":
            return <OffersIcon {...iconProps} className={className} />;
        case "library":
            return <LibraryIcon {...iconProps} className={className} />;
        default:
            return null;
    }

};

export default SysIcon;
