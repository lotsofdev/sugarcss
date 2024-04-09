// @ts-ignore
export default function sugarcss(settings?: ISugarCssSettings): any;

export interface ISugarCssEnv {
  colors: Record<string, any>;
  shades: Record<string, any>;
}

export interface ISugarCssSettings {
  prefix: string;
  verbose: boolean;
}
