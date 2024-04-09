import { env } from '../../sugarcss.js';
import { __convert } from '@lotsof/sugar/color';
export default function color(v, settings) {
    var _a, _b;
    const name = v.name.replace(`--${settings.prefix}color-`, '');
    const hslaColor = __convert((_b = (_a = v.value[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : v.value[0], 'hsla');
    env.colors[name] = hslaColor;
    const result = [
        {
            property: `--${settings.prefix}color-${name}`,
            value: {
                name: `--${settings.prefix}color-${name}`,
                value: v.value,
            },
        },
    ];
    ['h', 's', 'l', 'a'].forEach((key) => {
        result.push({
            property: `--${settings.prefix}color-${name}-${key}`,
            value: {
                name: `--${settings.prefix}color-${name}-${key}`,
                value: [
                    {
                        type: 'token',
                        value: {
                            type: 'number',
                            value: hslaColor[key],
                        },
                    },
                ],
            },
        });
    });
    if (settings.verbose) {
        console.log(`Registered color: <cyan>${name}</cyan>: <yellow>${JSON.stringify(hslaColor)}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=color.js.map