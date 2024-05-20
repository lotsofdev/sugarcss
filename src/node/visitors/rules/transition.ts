import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

import __ensureTransitionExists from '../../ensure/transitionExists.js';

import { env } from '../../sugarcss.js';

/**
 * @name            transition
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered transition easily.
 * To be able to use this, you need to register at least 1 transition like so:
 *
 * - `--s-transition-{name}: all .3s ease-in-out;`
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                              The generated css
 *
 * @example         css
 *
 * --s-transition-slow: all .3s ease-in-out;
 *
 * .my-element {
 *      @s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function transition(v: any, settings: ISugarCssSettings): any {
  // parse args
  const args = {
    name: 'default',
    ...__parseArgs(v.prelude, ['name']),
  };

  __ensureTransitionExists(args.name);

  const ast = [
    {
      type: 'style',
      value: {
        selectors: [
          [
            {
              type: 'nesting',
            },
          ],
        ],
        declarations: {
          importantDeclarations: [],
          declarations: [
            {
              property: 'custom',
              value: {
                name: 'transition',
                value: env.transitions[args.name].ast.value,
              },
            },
          ],
        },
        rules: [],
        loc: {
          source_index: 4,
          line: 0,
          column: 19,
        },
      },
    },
  ];

  return ast;

  //   if (args.arg0 === 'hide') {
  //     return __hideAst();
  //   } else {
  //     return __scrollbarAst(args.arg0, args.arg1.value, args.arg2.value);
  //   }
}
