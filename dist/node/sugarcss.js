import __colorDeclaration from './visitors/declarations/color.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __colorFunction from './visitors/functions/color.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __mediaRule from './visitors/rules/media.js';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    colors: {},
    shades: {},
    medias: {},
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
    const finalSettings = Object.assign({ prefix: 's-', verbose: true, mobileFirst: false, scalable: ['padding'] }, settings);
    const visitors = {
        Function: {
            [`${finalSettings.prefix}color`](v) {
                return __colorFunction(v, finalSettings);
            },
            [`${finalSettings.prefix}scalable`](v) {
                return __scalableFunction(v, finalSettings);
            },
        },
        Declaration: {
            // padding(v) {
            //   console.log(v.value.top);
            // },
            // paddingInline(v) {
            //   console.log('V', v);
            // },
            custom(v) {
                switch (true) {
                    case v.name.startsWith(`--${finalSettings.prefix}color-`):
                        return __colorDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}shade-`):
                        return __shadeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}media-`):
                        return __mediaDeclaration(v, finalSettings);
                    case v.name === 'padding':
                        console.log('p', v);
                        break;
                }
            },
        },
        Rule: {
            media(rule) {
                var _a;
                (_a = rule.value.query.mediaQueries) === null || _a === void 0 ? void 0 : _a.map((mediaQuery) => {
                    return __mediaRule(mediaQuery, finalSettings);
                });
                return rule;
            },
        },
    };
    // for (let [i, prop] of finalSettings.scalable.entries()) {
    //   visitors.Declaration[prop] = (v) => {
    //     console.log(v);
    //     for (let [key, value] of Object.entries(v.value)) {
    //       console.log(key, value);
    //     }
    //   };
    // }
    return visitors;
}
//# sourceMappingURL=sugarcss.js.map