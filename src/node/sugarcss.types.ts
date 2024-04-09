// @ts-ignore
export default function sugarcss(settings?: ISugarCssSettings): any;

export interface ISugarCssEnv {
  colors: Record<string, any>;
  shades: Record<string, any>;
  medias: Record<
    string,
    {
      min?: number | string;
      max?: number | string;
    }
  >;
}

export interface ISugarCssSettings {
  prefix: string;
  verbose: boolean;
  mobileFirst: boolean;
  scalable: string[];
}
