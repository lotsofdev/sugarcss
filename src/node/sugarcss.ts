import { ISugarCssEnv, ISugarCssSettings } from './sugarcss.types';

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
import {
  TransformOptions,
  browserslistToTargets,
  composeVisitors,
} from 'lightningcss';

import { __parseHtml } from '@lotsof/sugar/console';

export const env: ISugarCssEnv = {
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
    customAtRules: {
      ...(ligningcss?.customAtRules ?? {}),
      mixin: {
        prelude: '<custom-ident>',
        body: 'style-block',
      },
      apply: {
        prelude: '<custom-ident>',
      },
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
        rule.value.query.mediaQueries?.map((mediaQuery) => {
          return __mediaRule(mediaQuery, finalSettings);
        });
        return rule;
      },
    },
  };

  return visitors;
}
