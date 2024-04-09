import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function color(value, settings) {
    var _a;
    const args = __parseArgs(value.arguments, ['color', 'modifiers']);
    let color = args.color, modifiers = args.modifiers;
    if (!env.colors[color]) {
        throw new Error(`Color ${color} not found. Please register it first like so: --${settings.prefix}color-${color}: ...;`);
    }
    if (typeof modifiers === 'string') {
        if (!env.shades[`${modifiers}-${color}`] && !env.shades[modifiers]) {
            throw new Error(`Shade ${modifiers} not found. Please register it first like so:\n --${settings.prefix}shade-${modifiers}: --darken 10;\n --${settings.prefix}shade-${modifiers}-${color}: --lighten 20;`);
        }
        modifiers = (_a = env.shades[`${modifiers}-${color}`]) !== null && _a !== void 0 ? _a : env.shades[modifiers];
    }
    if (modifiers) {
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
                `calc(var(--${settings.prefix}color-${color}-h)${spin}),`,
                `calc((var(--${settings.prefix}color-${color}-s)${sModifier}) * 1%),`,
                `calc((var(--${settings.prefix}color-${color}-l)${lModifier}) * 1%),`,
                `var(--${settings.prefix}color-${color}-a)`,
                `)`,
            ].join(''),
        };
    }
    else {
        return {
            raw: `var(--${settings.prefix}color-${color})`,
        };
    }
}
//# sourceMappingURL=color.js.map