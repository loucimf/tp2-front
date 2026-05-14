/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  import type { FC, SVGProps } from "react";

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}
