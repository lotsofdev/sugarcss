// @ts-ignore
export default function sugarcss(settings?: ISugarCssSettings): any;

export interface ISugarCssEnv {
  settings: ISugarCssSettings;
  colors: Record<string, any>;
  shades: Record<string, ISugarCssShade>;
  easings: Record<string, ISugarCssEasing>;
  medias: Record<string, ISugarCssMedia>;
  spaces: ISugarCssSpace;
}

export interface ISugarCssSettings {
  prefix: string;
  verbose: boolean;
  mobileFirst: boolean;
  scalable: string[];
}

export interface ISugarCssSpace {
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
