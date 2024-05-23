import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function easing(v, settings: ISugarCssSettings): any {
  const name = v.name.replace(`--${settings.prefix}easing-`, ''),
    args = __parseArgs(v.value, ['function'], {
      separator: ['white-space', 'comma'],
    });

  env.easings[name] = {
    function: args.values.function,
  };

  if (settings.verbose) {
    console.log(
      `Registered easing: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  return [];
}
