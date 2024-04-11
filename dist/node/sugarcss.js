import __colorDeclaration from './visitors/declarations/color.js';
import __easingsDeclaration from './visitors/declarations/easing.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __settingDeclaration from './visitors/declarations/setting.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __spaceDeclaration from './visitors/declarations/space.js';
import __colorFunction from './visitors/functions/color.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __spaceFunction from './visitors/functions/space.js';
import __mediaRule from './visitors/rules/media.js';
import browserslist from 'browserslist';
import { browserslistToTargets, composeVisitors, } from 'lightningcss';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    settings: {
        prefix: 's-',
        verbose: true,
        mobileFirst: false,
        scalable: ['padding'],
    },
    colors: {},
    shades: {},
    easings: {},
    medias: {},
    spaces: {
        easing: 'linear',
        min: 0,
        max: 100,
    },
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
export function sugarize(ligningcss, settings) {
    var _a, _b;
    const visitor = [sugarcss(settings)];
    if (ligningcss === null || ligningcss === void 0 ? void 0 : ligningcss.visitor) {
        visitor.push(ligningcss.visitor);
    }
    return {
        customAtRules: Object.assign(Object.assign({}, ((_a = ligningcss === null || ligningcss === void 0 ? void 0 : ligningcss.customAtRules) !== null && _a !== void 0 ? _a : {})), { mixin: {
                prelude: '<custom-ident>',
                body: 'style-block',
            }, apply: {
                prelude: '<custom-ident>',
            } }),
        visitor: composeVisitors(visitor),
        targets: (_b = ligningcss.targets) !== null && _b !== void 0 ? _b : browserslistToTargets(browserslist('>= 0.25%')),
    };
}
export default function sugarcss(settings = {}) {
    const finalSettings = Object.assign(Object.assign({}, env.settings), settings);
    env.settings = finalSettings;
    let mixins = new Map();
    const visitors = {
        Function: {
            [`${finalSettings.prefix}color`](v) {
                return __colorFunction(v, finalSettings);
            },
            [`${finalSettings.prefix}scalable`](v) {
                return __scalableFunction(v, finalSettings);
            },
            [`${finalSettings.prefix}space`](v) {
                return __spaceFunction(v, finalSettings);
            },
        },
        Declaration: {
            custom(v) {
                switch (true) {
                    case v.name.startsWith(`--${finalSettings.prefix}color-`):
                        return __colorDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}shade-`):
                        return __shadeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}media-`):
                        return __mediaDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}easing-`):
                        return __easingsDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}space-`):
                        return __spaceDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}setting-`):
                        return __settingDeclaration(v, finalSettings);
                    case v.name === 'padding':
                        console.log('p', v);
                        break;
                }
            },
        },
        Rule: {
            custom: {
                mixin(rule) {
                    mixins.set(rule.prelude.value, rule.body.value);
                    return [];
                },
                apply(rule) {
                    return mixins.get(rule.prelude.value);
                },
            },
            media(rule) {
                var _a;
                (_a = rule.value.query.mediaQueries) === null || _a === void 0 ? void 0 : _a.map((mediaQuery) => {
                    return __mediaRule(mediaQuery, finalSettings);
                });
                return rule;
            },
        },
    };
    return visitors;
}
//# sourceMappingURL=sugarcss.js.map