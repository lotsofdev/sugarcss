import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function scalable(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments);

  const result = {
    raw: '',
  };

  for (let [key, value] of Object.entries(args)) {
    result.raw += `calc(${value} + var(--${settings.prefix}scale, 1))`;
  }

  return result;
}
