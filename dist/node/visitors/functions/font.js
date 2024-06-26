import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __ensureFontExists from '../../ensure/fontExists.js';
/**
 * @name            s-font
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a font from the fonts registered ones.
 * The supported fonts properties are:
 *
 * - `family`: The font family like "sans-serif", "serif", etc...
 * - `size`: The font size like "1em", "12px", etc...
 * - `lineHeight`: The font line-height like "1em", "12px", etc...
 * - `weight`: The font weight like "normal", "bold", etc...
 * - `style`: The font style like "normal", "italic", etc...
 * - `variant`: The font variant like "normal", "small-caps", etc...
 * - `stretch`: The font stretch like "normal", "condensed", etc...
 *
 * @param      {String}        font         The font name you want to apply from registered ones
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *   --s-font-...: "Roboto,sans-serif" %size %lineHeight %weight %style %variant %stretch;
 *   --s-font-family-code: "Fira Code", monospace;
 *   --s-font-code: s-font-family(code) 16px 26px 300;
 * }
 *
 * .my-element {
 *   font: s-font(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(value, settings) {
    var _a, _b, _c, _d, _e;
    const args = __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    });
    const fontsArgs = env.fonts.fonts;
    __ensureFontExists(args.values.name);
    const fontArgs = fontsArgs[args.values.name];
    // size and line-height
    let size = '1em', lineHeight = '1em';
    if (fontArgs.size) {
        if (`${fontArgs.size}`.match(/^[0-9]+$/)) {
            size = `${fontArgs.size}px`;
        }
        else {
            size = fontArgs.size;
        }
    }
    if (fontArgs.lineHeight) {
        if (`${fontArgs.lineHeight}`.match(/^[0-9]+$/)) {
            lineHeight = `${fontArgs.lineHeight}px`;
        }
        else {
            lineHeight = fontArgs.lineHeight;
        }
    }
    const props = [];
    props.push((_a = fontArgs.style) !== null && _a !== void 0 ? _a : 'normal');
    props.push((_b = fontArgs.variant) !== null && _b !== void 0 ? _b : 'normal');
    props.push((_c = fontArgs.weight) !== null && _c !== void 0 ? _c : 'normal');
    props.push((_d = fontArgs.stretch) !== null && _d !== void 0 ? _d : 'normal');
    props.push(`${size}/${lineHeight}`);
    props.push((_e = fontArgs.family) !== null && _e !== void 0 ? _e : 'sans-serif');
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=font.js.map