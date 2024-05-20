import { ISugarCssEnv, ISugarCssSettings } from './sugarcss.types.js';
import { TransformOptions } from 'lightningcss';
export declare const env: ISugarCssEnv;
export declare function sugarize(ligningcss: TransformOptions<any>, settings?: Partial<ISugarCssSettings>): any;
export default function sugarcss(settings?: Partial<ISugarCssSettings>): any;
