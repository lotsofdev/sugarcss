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
export default function scrollbar(v: any, settings: ISugarCssSettings): any;
