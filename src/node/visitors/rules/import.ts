import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function _import(v: any, settings: ISugarCssSettings): any {
  // parse args
  const args = __parseArgs(v.prelude, ['path']);

  console.log(JSON.stringify(v, null, 4));
}
