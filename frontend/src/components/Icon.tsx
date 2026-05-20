import type { SVGProps } from "react";
import { ReactComponent as ExploreIcon } from "../assets/svgs/explore.svg?react";
import { ReactComponent as LibraryIcon } from "../assets/svgs/library.svg?react";
import { ReactComponent as OffersIcon } from "../assets/svgs/offers.svg?react";
import { ReactComponent as TrendingIcon } from "../assets/svgs/trending.svg?react";
import { ReactComponent as BellIcon } from "../assets/svgs/bell.svg?react";
import { ReactComponent as FilterIcon } from "../assets/svgs/filter.svg?react";
import { ReactComponent as PlayIcon } from "../assets/svgs/play.svg?react";
import { ReactComponent as PlaystationIcon } from "../assets/svgs/playstation.svg?react";
import { ReactComponent as PlusIcon } from "../assets/svgs/plus.svg?react";
import { ReactComponent as SaveIcon } from "../assets/svgs/save.svg?react";
import { ReactComponent as StarIcon } from "../assets/svgs/star.svg?react";
import { ReactComponent as WindowsIcon } from "../assets/svgs/windows.svg?react";
import { ReactComponent as XboxIcon } from "../assets/svgs/xbox.svg?react";

export type SVGIcons =
    | "explore"
    | "offer"
    | "library"
    | "trending"
    | "bell"
    | "filter"
    | "play"
    | "playstation"
    | "plus"
    | "save"
    | "star"
    | "windows"
    | "xbox";
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
        case "trending":
            return <TrendingIcon {...iconProps} className={className} />;
        case "bell":
            return <BellIcon {...iconProps} className={className} />;
        case "filter":
            return <FilterIcon {...iconProps} className={className} />;
        case "play":
            return <PlayIcon {...iconProps} className={className} />;
        case "playstation":
            return <PlaystationIcon {...iconProps} className={className} />;
        case "plus":
            return <PlusIcon {...iconProps} className={className} />;
        case "save":
            return <SaveIcon {...iconProps} className={className} />;
        case "star":
            return <StarIcon {...iconProps} className={className} />;
        case "windows":
            return <WindowsIcon {...iconProps} className={className} />;
        case "xbox":
            return <XboxIcon {...iconProps} className={className} />;
        default:
            return null;
    }

};

export default SysIcon;
