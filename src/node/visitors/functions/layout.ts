import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

import __ensureFontExists from '../../ensure/fontExists.js';

/**
 * @name            s-layout
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Allow to get some layout related properties like:
 *
 * - `width`: The calculated layout width relative to the `--s-layout-max-width` and the `--s-layout-side-padding` variables
 *
 * @param      {String}        prop         The layout property wanted
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *   --s-layout-max-width: 1200px;
 *   --s-layout-side-padding: 20px;
 * }
 *
 * .my-element {
 *   width: s-layout(width);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function layout(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments, ['prop'], {
    separator: ['white-space', 'comma'],
  });

  const props: string[] = [];

  switch (args.values.prop) {
    case 'width':
      props.push(
        'clamp(var(--s-layout-min-width, 0px), calc(var(--s-layout-max-width) - var(--s-layout-side-padding) * 2), calc(100% - var(--s-layout-side-padding) * 2))',
      );
      break;
  }

  return {
    raw: props.join(' '),
  };
}
