import __colorDeclaration from './visitors/declarations/color.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __colorFunction from './visitors/functions/color.js';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    colors: {},
    shades: {},
};
const nativeConsoleLog = console.log;
console.log = (...args) => {
    args.forEach((arg) => {
        if (typeof arg === 'string') {
            arg = __parseHtml(arg);
        }
        nativeConsoleLog(arg);
    });
};
export default function sugarcss(settings = {}) {
    const finalSettings = Object.assign({ prefix: 's-', verbose: true }, settings);
    return {
        Function: {
            [`${finalSettings.prefix}color`](v) {
                return __colorFunction(v, finalSettings);
            },
        },
        Declaration: {
            custom(v) {
                switch (true) {
                    case v.name.startsWith(`--${finalSettings.prefix}color-`):
                        return __colorDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}shade-`):
                        return __shadeDeclaration(v, finalSettings);
                }
            },
        },
        // Property: {
        //   unknown(v) {
        //     console.log(v);
        //   },
        // },
        // Rule: {
        //   unknown(v) {
        //     console.log(JSON.stringify(v, null, 2));
        //     console.log(v.toString());
        //     if (v.property === 'unparsed') {
        //       // Handle unparsed value, e.g. `var(--w)`
        //     } else {
        //       console.log(v);
        //       // Handle parsed value, e.g. `12px`
        //     }
        //   },
        // },
    };
}
//# sourceMappingURL=sugarcss.js.map