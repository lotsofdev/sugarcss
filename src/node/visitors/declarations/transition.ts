import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function transition(v, settings: ISugarCssSettings): any {
  const name = v.name.replace(`--${settings.prefix}transition-`, ''),
    args = __parseArgs(
      v.value,
      ['property', 'duration', 'easing', 'delay', 'behavior'],
      {
        separator: ['white-space', 'comma'],
      },
    );

  env.transitions[name] = {
    ...args.values,
    ast: v,
  };

  if (settings.verbose) {
    console.log(
      `Registered transition: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  return [];
}
