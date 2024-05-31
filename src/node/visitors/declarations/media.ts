import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-media
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a media query easily and use it in your css.
 * You can declare as many media queries as you want.
 *
 * @param    {String}         min                The min value for the media query
 * @param    {String}         max                The max value for the media query
 *
 * @example         css
 * :root {
 *    --s-media-mobile: 0 768px;
 *    --s-media-tablet: 769px 1024px;
 *    --s-media-desktop: 1025px;
 *    --s-media-wide: 1440px;
 * }
 *
 * .my-element {
 *    color: s-color(accent);
 *
 *    \@media mobile {
 *        color: red;
 *    }
 *
 *    \@media lt-tablet {
 *        color: blue;
 *    }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function media(v, settings: ISugarCssSettings): any {
  const media = v.name.replace(`--s-media-`, ''),
    args = __parseArgs(v.value, ['min', 'max'], {
      separator: ['white-space', 'comma'],
    });

  if (!env.medias[media]) {
    env.medias[media] = {};
  }

  env.medias[media].min = args.values.min ?? 0;
  env.medias[media].max = args.values.max ?? 0;

  if (settings.verbose) {
    console.log(
      `Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(
        env.medias[media],
      )}</yellow>`,
    );
  }

  return [];
}
