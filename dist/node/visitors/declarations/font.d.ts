import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-font
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a font easily and use it in your css.
 * You can declare as many fonts as you want.
 *
 * @param     {String}        family                The font family to use
 * @param     {String}        size                  The font size to use
 * @param     {String}        lineHeight             The font line height to use
 * @param     {String}        weight                 The font weight to use
 * @param     {String}        style                  The font style to use
 * @param     {String}        variant                The font variant to use
 * @param     {String}        stretch                The font stretch to use
 *
 * @example         css
 * :root {
 *    --s-font-default: s-font-family(sans) 16px 26px;
 *    --s-font-lead: s-font-family(sans) 26px 40px;
 *    --s-font-title: VT323 s-size(100) s-size(100) 300;
 *    --s-font-code: s-font-family(code) 16px 26px 300;
 * }
 *
 * .my-element {
 *    font: s-font(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(v: any, settings: TSugarCssSettings): any;
