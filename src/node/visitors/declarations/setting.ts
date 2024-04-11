import { __camelCase, __parse } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function setting(v, settings: ISugarCssSettings): any {
  const name = __camelCase(v.name.replace(`--${settings.prefix}setting-`, '')),
    args = __parseArgs(v.value, ['value'], {
      separator: ['white-space', 'comma'],
    });

  env.settings[name] = __parse(args.value);

  if (settings.verbose) {
    console.log(
      `Registered setting: <cyan>${name}</cyan>: <yellow>${env.settings[name]}</yellow>`,
    );
  }

  return [];
}
