import __colorDeclaration from './visitors/declarations/color.js';
import __easingsDeclaration from './visitors/declarations/easing.js';
import __fontDeclaration from './visitors/declarations/font.js';
import __fontFamilyDeclaration from './visitors/declarations/fontFamily.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __radiusDeclaration from './visitors/declarations/radius.js';
import __settingDeclaration from './visitors/declarations/setting.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __sizesDeclaration from './visitors/declarations/sizes.js';
import __spacesDeclaration from './visitors/declarations/spaces.js';
import __transitionDeclaration from './visitors/declarations/transition.js';
import __colorFunction from './visitors/functions/color.js';
import __fontFunction from './visitors/functions/font.js';
import __fontFamilyFunction from './visitors/functions/fontFamily.js';
import __radiusFunction from './visitors/functions/radius.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __layoutFunction from './visitors/functions/layout.js';
import __sizeFunction from './visitors/functions/size.js';
import __spaceFunction from './visitors/functions/space.js';
import __transitionFunction from './visitors/functions/transition.js';
import __mediaRule from './visitors/rules/media.js';
import __radiusRule from './visitors/rules/radius.js';
import __scrollbarRule from './visitors/rules/scrollbar.js';
import __transitionRule from './visitors/rules/transition.js';
import browserslist from 'browserslist';
import { browserslistToTargets, composeVisitors, } from 'lightningcss';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    functions: {},
    settings: {
        verbose: true,
        mobileFirst: false,
        scalable: ['padding'],
    },
    colors: {},
    shades: {},
    easingFunctions: {
        linear: '1',
        inSin: '1 - cos((t * pi) / 2)',
        outSin: 'sin((t * pi) / 2)',
        inOutSin: '((cos(pi * t) - 1) / 2) * -1',
        inQuad: 't * t',
        outQuad: 't * (2 - t)',
        inCubic: '1 - pow(1 - t, 3)',
        outCubic: '4 * t * t * t',
        inQuart: 'pow(t, 4)',
        outQuart: '1 - pow(1 - t, 4)',
        inQuint: 'pow(t, 5)',
        outQuint: '1 - pow(1 - t, 5)',
        inExpo: 'pow(2, 10 * (t - 1))',
        outExpo: '1 - pow(2, -10 * t)',
    },
    easings: {},
    transitions: {},
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
    radiuses: {},
    fonts: {
        family: {},
        fonts: {},
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
    env.functions[`s-color`] = __colorFunction;
    env.functions[`s-font-family`] = __fontFamilyFunction;
    env.functions[`s-scalable`] = __scalableFunction;
    env.functions[`s-size`] = __sizeFunction;
    env.functions[`s-space`] = __spaceFunction;
    env.functions[`s-font`] = __fontFunction;
    env.functions[`s-transition`] = __transitionFunction;
    env.functions[`s-radius`] = __radiusFunction;
    env.functions['s-layout'] = __layoutFunction;
    let mixins = new Map();
    const visitors = {
        Function: {
            [`s-color`](v) {
                return __colorFunction(v, finalSettings);
            },
            [`s-scalable`](v) {
                return __scalableFunction(v, finalSettings);
            },
            [`s-space`](v) {
                return __spaceFunction(v, finalSettings);
            },
            [`s-size`](v) {
                return __sizeFunction(v, finalSettings);
            },
            [`s-font-family`](v) {
                return __fontFamilyFunction(v, finalSettings);
            },
            [`s-font`](v) {
                return __fontFunction(v, finalSettings);
            },
            [`s-transition`](v) {
                return __transitionFunction(v, finalSettings);
            },
            [`s-radius`](v) {
                return __radiusFunction(v, finalSettings);
            },
            ['s-layout'](v) {
                return __layoutFunction(v, finalSettings);
            },
        },
        Declaration: {
            custom(v) {
                if (v.name === 'custom') {
                    console.log(JSON.stringify(v, null, 4));
                }
                switch (true) {
                    case v.name.startsWith(`--s-color-`):
                        return __colorDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-shade-`):
                        return __shadeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-media-`):
                        return __mediaDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-easing-`):
                        return __easingsDeclaration(v, finalSettings);
                    case v.name === '--s-spaces':
                        return __spacesDeclaration(v, finalSettings);
                    case v.name === '--s-sizes':
                        return __sizesDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-setting-`):
                        return __settingDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-font-`) &&
                        !v.name.startsWith(`--s-font-family-`):
                        return __fontDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-font-family-`):
                        return __fontFamilyDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-transition-`):
                        return __transitionDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-radius-`):
                        return __radiusDeclaration(v, finalSettings);
                }
            },
        },
        Rule: {
            unknown(rule) {
                switch (true) {
                    case rule.name === `s-scrollbar`:
                        return __scrollbarRule(rule, finalSettings);
                    case rule.name === `s-transition`:
                        return __transitionRule(rule, finalSettings);
                    case rule.name === `s-radius`:
                        return __radiusRule(rule, finalSettings);
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