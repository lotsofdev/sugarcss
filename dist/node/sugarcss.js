import __colorDeclaration from './visitors/declarations/color.js';
import __easingsDeclaration from './visitors/declarations/easing.js';
import __fontFamilyDeclaration from './visitors/declarations/fontFamily.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __settingDeclaration from './visitors/declarations/setting.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __sizeDeclaration from './visitors/declarations/size.js';
import __spaceDeclaration from './visitors/declarations/space.js';
import __typoDeclaration from './visitors/declarations/typo.js';
import __colorFunction from './visitors/functions/color.js';
import __fontFamilyFunction from './visitors/functions/fontFamily.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __sizeFunction from './visitors/functions/size.js';
import __spaceFunction from './visitors/functions/space.js';
import __typoFunction from './visitors/functions/typo.js';
import __mediaRule from './visitors/rules/media.js';
import __scrollbarRule from './visitors/rules/scrollbar.js';
import browserslist from 'browserslist';
import { browserslistToTargets, composeVisitors, } from 'lightningcss';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    functions: {},
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
    sizes: {
        easing: 'linear',
        min: 0,
        max: 100,
    },
    fonts: {
        family: {},
    },
    typos: {},
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
        // nonStandard: {
        //   deepSelectorCombinator: true,
        // },
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
    env.functions[`${finalSettings.prefix}color`] = __colorFunction;
    env.functions[`${finalSettings.prefix}font-family`] = __fontFamilyFunction;
    env.functions[`${finalSettings.prefix}scalable`] = __scalableFunction;
    env.functions[`${finalSettings.prefix}size`] = __sizeFunction;
    env.functions[`${finalSettings.prefix}space`] = __spaceFunction;
    env.functions[`${finalSettings.prefix}typo`] = __typoFunction;
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
            [`${finalSettings.prefix}size`](v) {
                return __sizeFunction(v, finalSettings);
            },
            [`${finalSettings.prefix}font-family`](v) {
                return __fontFamilyFunction(v, finalSettings);
            },
            [`${finalSettings.prefix}typo`](v) {
                return __typoFunction(v, finalSettings);
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
                    case v.name.startsWith(`--${finalSettings.prefix}size-`):
                        return __sizeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}setting-`):
                        return __settingDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}typo-`):
                        return __typoDeclaration(v, finalSettings);
                    case v.name.startsWith(`--${finalSettings.prefix}font-family-`):
                        return __fontFamilyDeclaration(v, finalSettings);
                    case v.name === 's-scrollbar':
                        return __scrollbarRule(v, finalSettings);
                }
            },
        },
        Rule: {
            unknown(rule) {
                switch (true) {
                    case rule.name === 's-scrollbar':
                        return __scrollbarRule(rule, finalSettings);
                }
            },
            custom: {
                mixin(rule) {
                    mixins.set(rule.prelude.value, rule.body.value);
                    return [];
                },
                apply(rule) {
                    // console.log(JSON.stringify(mixins.get(rule.prelude.value), null, 2));
                    return mixins.get(rule.prelude.value);
                },
                // 's-scrollbar'(rule) {
                //   return __scrollbarRule(rule, finalSettings);
                // },
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