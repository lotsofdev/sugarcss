import { ISugarCssEnv, ISugarCssSettings } from './sugarcss.types';

import __colorDeclaration from './visitors/declarations/color.js';
import __easingsDeclaration from './visitors/declarations/easing.js';
import __fontDeclaration from './visitors/declarations/font.js';
import __fontFamilyDeclaration from './visitors/declarations/fontFamily.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __settingDeclaration from './visitors/declarations/setting.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __sizeDeclaration from './visitors/declarations/size.js';
import __spaceDeclaration from './visitors/declarations/space.js';
import __transitionDeclaration from './visitors/declarations/transition.js';
import __colorFunction from './visitors/functions/color.js';
import __fontFunction from './visitors/functions/font.js';
import __fontFamilyFunction from './visitors/functions/fontFamily.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __sizeFunction from './visitors/functions/size.js';
import __spaceFunction from './visitors/functions/space.js';
import __transitionFunction from './visitors/functions/transition.js';
import __mediaRule from './visitors/rules/media.js';
import __scrollbarRule from './visitors/rules/scrollbar.js';
import __transitionRule from './visitors/rules/transition.js';

import browserslist from 'browserslist';
import {
  TransformOptions,
  browserslistToTargets,
  composeVisitors,
} from 'lightningcss';

import { __parseHtml } from '@lotsof/sugar/console';

export const env: ISugarCssEnv = {
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
  fonts: {
    family: {},
    fonts: {},
  },
};

const nativeConsoleLog = console.log;
console.log = (...args): void => {
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      arg = __parseHtml(arg);
    }
    nativeConsoleLog(arg);
  });
};

export function sugarize(
  ligningcss: TransformOptions<any>,
  settings?: Partial<ISugarCssSettings>,
): any {
  const visitor = [sugarcss(settings)];
  if (ligningcss?.visitor) {
    visitor.push(ligningcss.visitor);
  }

  return {
    // nonStandard: {
    //   deepSelectorCombinator: true,
    // },
    customAtRules: {
      ...(ligningcss?.customAtRules ?? {}),
      mixin: {
        prelude: '<custom-ident>',
        body: 'style-block',
      },
      apply: {
        prelude: '<custom-ident>',
      },
      // resolver: {
      //   read(filePath) {
      //     console.log('file', filePath);
      //     return __fs.readFileSync(filePath, 'utf8');
      //   },
      //   resolve(specifier, from) {
      //     console.log('reso', specifier, from);
      //     return __path.resolve(__path.dirname(from), specifier);
      //   },
      // },
      // 's-scrollbar': {
      //   prelude: '<custom-ident>',
      // },
    },

    visitor: composeVisitors(visitor),
    targets:
      ligningcss.targets ?? browserslistToTargets(browserslist('>= 0.25%')),
  };
}

export default function sugarcss(
  settings: Partial<ISugarCssSettings> = {},
): any {
  const finalSettings: ISugarCssSettings = {
    ...env.settings,
    ...settings,
  };
  env.settings = finalSettings;
  env.functions[`${finalSettings.prefix}color`] = __colorFunction;
  env.functions[`${finalSettings.prefix}font-family`] = __fontFamilyFunction;
  env.functions[`${finalSettings.prefix}scalable`] = __scalableFunction;
  env.functions[`${finalSettings.prefix}size`] = __sizeFunction;
  env.functions[`${finalSettings.prefix}space`] = __spaceFunction;
  env.functions[`${finalSettings.prefix}font`] = __fontFunction;
  env.functions[`${finalSettings.prefix}transition`] = __transitionFunction;

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
      [`${finalSettings.prefix}font`](v) {
        return __fontFunction(v, finalSettings);
      },
      [`${finalSettings.prefix}transition`](v) {
        return __transitionFunction(v, finalSettings);
      },
    },
    Declaration: {
      custom(v) {
        if (v.name === 'custom') {
          console.log(JSON.stringify(v, null, 4));
        }
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
          case v.name.startsWith(`--${finalSettings.prefix}font-`) &&
            !v.name.startsWith(`--${finalSettings.prefix}font-family-`):
            return __fontDeclaration(v, finalSettings);
          case v.name.startsWith(`--${finalSettings.prefix}font-family-`):
            return __fontFamilyDeclaration(v, finalSettings);
          case v.name.startsWith(`--${finalSettings.prefix}transition-`):
            return __transitionDeclaration(v, finalSettings);
        }
      },
    },
    Rule: {
      unknown(rule) {
        switch (true) {
          case rule.name === `${finalSettings.prefix}scrollbar`:
            return __scrollbarRule(rule, finalSettings);
          case rule.name === `${finalSettings.prefix}transition`:
            return __transitionRule(rule, finalSettings);
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
        rule.value.query.mediaQueries?.map((mediaQuery) => {
          return __mediaRule(mediaQuery, finalSettings);
        });
        return rule;
      },
    },
  };

  return visitors;
}
