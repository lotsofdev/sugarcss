import { ISugarCssSettings } from '../../sugarcss.types.js';
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
export default function layout(value: any, settings: ISugarCssSettings): any;
