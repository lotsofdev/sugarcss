import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';

/**
 * @name            media
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This function allows you to define media queries easily with these features:
 *
 * - Define your own media queries like so: --s-media-desktop: 1024px 9999px;
 * - Use defined media queries easily
 * - Support for operators like `lt-` (lower than), `lte-` (lower than or equal), `e-` (equal), `gt-` (greater than), `gte-` (greater than or equal)
 * - Support for `dark` and `light` media queries
 *
 * @param      {String}        query              The query to parse
 * @return     {Css}                              The generated css
 *
 * @example         css
 *
 * --s-media-phone: 0 767px;
 * --s-media-tablet: 768px 1023px;
 * --s-media-desktop: 1024px 9999px;
 *
 * .my-element {
 *    @media phone { ... }
 *    @media lt-desktop { ... }
 *    @media e-tablet { ... }
 *    @media dark { ... }
 *    @media gt-phone { ... }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function media(v: any, settings: ISugarCssSettings): any {
  const possibleMedias: string[] = [];
  ['lt-', 'lte-', 'e-', 'gt-', 'gte-', ''].forEach((operator) => {
    for (let [media, mediaArgs] of Object.entries(env.medias)) {
      possibleMedias.push(`${operator}${media}`);
    }
  });

  if (['dark', 'light'].includes(v.mediaType)) {
    switch (v.mediaType) {
      case 'dark':
        v.mediaType = '(prefers-color-scheme: dark)';
        break;
      case 'light':
        v.mediaType = '(prefers-color-scheme: light)';
        break;
    }
  } else if (possibleMedias.includes(v.mediaType)) {
    // parse the media
    let operator = '',
      media = '';

    const parts = v.mediaType.split('-');
    if (parts.length === 1) {
      media = parts[0];
    } else {
      (operator = parts[0]), (media = parts.slice(1).join('-'));
    }

    // make sure the requested media exists
    if (!env.medias[media]) {
      throw new Error(
        `Media ${media} does not exist. Please define it like so:\n- --${settings.prefix}media-${media}: 0 768px;`,
      );
    }

    const mediaArgs = env.medias[media];
    let query = '';

    switch (operator) {
      case 'lt':
        query = `(max-width: ${mediaArgs.min ?? 0}px)`;
        break;
      case 'lte':
        query = `(max-width: ${mediaArgs.max}px)`;
        break;
      case 'e':
        query = `(min-width: ${mediaArgs.min}px) and (max-width: ${mediaArgs.max}px)`;
        break;
      case 'gt':
        query = `(min-width: ${mediaArgs.max ?? 0}px)`;
        break;
      case 'gte':
        query = `(min-width: ${mediaArgs.min}px)`;
        break;
      default:
        if (settings.mobileFirst) {
          if (mediaArgs.min) {
            query += query ? ' and ' : '';
            query += `(min-width: ${mediaArgs.min}px)`;
          }
        } else {
          if (mediaArgs.max) {
            query += query ? ' and ' : '';
            query += `(max-width: ${mediaArgs.max}px)`;
          }
        }
        break;
    }

    // set the new media
    v.mediaType = query;
  }

  return v;
}
