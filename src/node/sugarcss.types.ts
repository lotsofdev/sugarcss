// @ts-ignore
export default function sugarcss(settings?: ISugarCssSettings): any;

export interface ISugarCssRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  ast: any;
}

export interface ISugarCssEnv {
  functions: Record<string, Function>;
  settings: ISugarCssSettings;
  colors: Record<string, any>;
  shades: Record<string, ISugarCssShade>;
  easingFunctions: Record<string, string>;
  easings: Record<string, ISugarCssEasing>;
  transitions: Record<string, ISugarCssTransition>;
  medias: Record<string, ISugarCssMedia>;
  spaces: ISugarCssSpace;
  sizes: ISugarCssSize;
  radiuses: Record<string, ISugarCssRadius>;
  fonts: ISugarCssFonts;
}

export interface ISugarCssTransition {
  property: string;
  duration: string;
  easing: string;
  delay: string;
  behavior: string;
  ast: any;
}

export interface ISugarCssFontsFont {
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
  fonts: Record<string, ISugarCssFontsFont>;
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
