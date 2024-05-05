import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function fontFamily(v, settings: ISugarCssSettings): any {
  const name = v.name.replace(`--${settings.prefix}font-family-`, '');

  const args = __parseArgs(v.value, [name], {
    separator: ['white-space', 'comma'],
  });

  env.fonts.family[name] = Object.values(args);

  if (settings.verbose) {
    console.log(
      `Registered font family argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        env.fonts.family[name],
      )}</yellow>`,
    );
  }

  return [];
}