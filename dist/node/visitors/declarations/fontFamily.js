import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-font-family
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a font family easily and use it in your css.
 * You can declare as many font families as you want.
 *
 * @param     {String}        family                The font family to use
 *
 * @example         css
 * :root {
 *    --s-font-family-sans: 'Roboto', sans-serif;
 *    --s-font-family-serif: 'Merriweather', serif;
 *    --s-font-family-code: 'Monaco', sans-serif;
 *    --s-font-family-quote: 'Palatino', serif;
 * }
 *
 * .my-element {
 *    font-family: s-font-family(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function fontFamily(v, settings) {
    const name = v.name.replace(`--s-font-family-`, '');
    const args = __parseArgs(v.value, [name], {
        separator: ['white-space', 'comma'],
    });
    env.fonts.family[name] = Object.values(args.values);
    if (settings.verbose) {
        console.log(`Registered font family argument: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.fonts.family[name])}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=fontFamily.js.map