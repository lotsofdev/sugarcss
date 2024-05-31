import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-color
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a color from the colors registered ones.
 * Allow to apply modifiers or shades to the color like darken, lighten, saturate, desaturate, spin, etc...
 * Here's the list of available modifiers:
 *
 * - `lighten`: 0-100
 * - `darken`: 0-100
 * - `saturate`: 0-100
 * - `desaturate`: 0-100
 * - `spin`: 0-360
 * - `alpha`: 0-1
 *
 * The shades are registered like so: --s-shade-placeholder: --darken 10;
 *
 * @param      {String}        color                The color name you want to apply like "main", "accent", etc...
 * @param      {String}        shadeOrModifiers      The shade name you want to apply like "text", "placeholder", etc... or a string of modifiers like --lighten 10 --saturate 20
 * @return     {Css}                                The generated css
 *
 * @example         css
 * :root {
 *    --s-shade-test: --lighten 10;
 * }
 *
 * .my-element {
 *   color: s-color(accent);
 *   color: s-color(accent, test);
 *   color: s-color(accent, --darken 20 --spin 30);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(value, settings) {
    var _a, _b;
    const args = __parseArgs(value.arguments, ['color', 'modifiers']), availableModifiers = [
        'lighten',
        'darken',
        'saturate',
        'desaturate',
        'spin',
        'alpha',
    ];
    let color = args.values.color, modifiers = args.values.modifiers;
    if (!env.colors[color]) {
        throw new Error(`Color "${color}" not found. Please register it first like so: --s-color-${color}: ...;`);
    }
    if (typeof modifiers === 'string') {
        if (!env.shades[`${modifiers}-${color}`] && !env.shades[modifiers]) {
            throw new Error(`Shade ${modifiers} not found. Please register it first like so:\n --s-shade-${modifiers}: --darken 10;\n --s-shade-${modifiers}-${color}: --lighten 20;`);
        }
        modifiers = (_a = env.shades[`${modifiers}-${color}`]) !== null && _a !== void 0 ? _a : env.shades[modifiers];
    }
    if (modifiers) {
        // check modifiers
        for (let [mod, val] of Object.entries(modifiers)) {
            if (!availableModifiers.includes(mod)) {
                throw new Error(`The requested "${mod}" color modifier is invalid. Here's the available ones: ${availableModifiers.join(',')}`);
            }
        }
        let lModifier = modifiers.darken
            ? ` - ${modifiers.darken}`
            : modifiers.lighten
                ? ` + ${modifiers.lighten}`
                : '', sModifier = modifiers.saturate
            ? ` + ${modifiers.saturate}`
            : modifiers.desaturate
                ? ` - ${modifiers.desaturate}`
                : '', spin = modifiers.spin ? `+ ${modifiers.spin}` : '';
        return {
            raw: [
                `hsla(`,
                `calc(var(--s-color-${color}-h)${spin}),`,
                `calc((var(--s-color-${color}-s)${sModifier}) * 1%),`,
                `calc((var(--s-color-${color}-l)${lModifier}) * 1%),`,
                `${(_b = modifiers.alpha) !== null && _b !== void 0 ? _b : 1}`,
                `)`,
            ].join(''),
        };
    }
    else {
        return {
            raw: `var(--s-color-${color})`,
        };
    }
}
//# sourceMappingURL=color.js.map