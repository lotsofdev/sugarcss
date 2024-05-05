import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function space(v, settings: ISugarCssSettings): any {
  const name = v.name.replace(`--${settings.prefix}space-`, ''),
    validArgs = ['easing', 'min', 'max'];

  if (!validArgs.includes(name)) {
    throw new Error(
      `Invalid space argument: ${name}. Valid arguments are: ${validArgs.join(
        ', ',
      )}`,
    );
  }

  const args = __parseArgs(v.value, [name], {
    separator: ['white-space', 'comma'],
  });

  let value = args[name];

  env.spaces[name] = value;

  if (settings.verbose) {
    console.log(
      `Registered space argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        env.spaces[name],
      )}</yellow>`,
    );
  }

  return [];
}
