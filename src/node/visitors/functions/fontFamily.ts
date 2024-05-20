import __ensureFontFamilyExists from '../../ensure/fontFamilyExists.js';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function fontFamily(
  value: any,
  settings: ISugarCssSettings,
): any {
  const args = __parseArgs(value.arguments, ['name'], {
    separator: ['white-space', 'comma'],
  });

  const fontFamilyArgs = env.fonts.family;

  // protect against invalid fonts
  __ensureFontFamilyExists(args.name);

  const families = fontFamilyArgs[args.name];

  return {
    raw: `${families.join(',')}`,
  };
}
