// @ts-ignore
export default function sugarcss(settings?: ISugarCssSettings): any;

export interface ISugarCssEnv {
  functions: Record<string, Function>;
  settings: ISugarCssSettings;
  colors: Record<string, any>;
  shades: Record<string, ISugarCssShade>;
  easings: Record<string, ISugarCssEasing>;
  medias: Record<string, ISugarCssMedia>;
  spaces: ISugarCssSpace;
  sizes: ISugarCssSize;
  fonts: ISugarCssFonts;
  typos: Record<string, ISugarCssTypo>;
}

export interface ISugarCssTypo {
  family: string;
  size: number;
  lineHeight: number;
  weight: string | number;
  style: string;
  variant: string;
  stretch: string | number;
}

export interface ISugarCssSettings {
  prefix: string;
  verbose: boolean;
  mobileFirst: boolean;
  scalable: string[];
}

export interface ISugarCssFonts {
  family: Record<string, string[]>;
}

export interface ISugarCssSpace {
  easing: string;
  min: number;
  max: number;
}

export interface ISugarCssSize {
  easing: string;
  min: number;
  max: number;
}

export interface ISugarCssShade {
  darken?: number;
  lighten?: number;
  saturate?: number;
  desaturate?: number;
  spin?: number;
  alpha?: number;
}

export interface ISugarCssMedia {
  min?: number;
  max?: number;
}

export interface ISugarCssEasing {
  function: string;
}
