import { __camelCase, __parse } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-setting
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to override default settings easily directly into your css.
 *
 * @param      {String}        value                The setting value to set
 *
 * @example         css
 * :root {
 *    --s-setting-mobile-first: true;
 *    --s-setting-verbose: false;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function setting(v, settings: ISugarCssSettings): any {
  const name = __camelCase(v.name.replace(`--s-setting-`, '')),
    args = __parseArgs(v.value, ['value'], {
      separator: ['white-space', 'comma'],
    });

  env.settings[name] = __parse(args.values.value);

  if (settings.verbose) {
    console.log(
      `Registered setting: <cyan>${name}</cyan>: <yellow>${env.settings[name]}</yellow>`,
    );
  }

  return [];
}
