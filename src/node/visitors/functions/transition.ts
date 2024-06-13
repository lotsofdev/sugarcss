import __ensureTransitionExists from '../../ensure/transitionExists.js';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-transition
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a transition from the transitions registered ones.
 *
 * @param     {String}      name      The transition name you want to apply from registered ones
 * @return    {Css}                   The generated css
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all 0.3s s-easing();
 *    --s-transition-default: all 0.2s s-easing();
 *    --s-transition-fast: all 0.1s s-easing();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function transition(
  value: any,
  settings: ISugarCssSettings,
): any {
  const args = {
    ...__parseArgs(value.arguments, ['name'], {
      separator: ['white-space', 'comma'],
    }),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

  console.log(args, env.transitions);

  __ensureTransitionExists(args.values.name);

  const transitionArgs = env.transitions[args.values.name];

  const parts: string[] = [];
  if (transitionArgs.duration) {
    parts.push(`${transitionArgs.duration}s`);
  }
  if (transitionArgs.property) {
    parts.push(transitionArgs.property);
  }
  if (transitionArgs.easing) {
    parts.push(transitionArgs.easing);
  }
  if (transitionArgs.delay) {
    parts.push(`${transitionArgs.delay}s`);
  }
  if (transitionArgs.behavior) {
    parts.push(transitionArgs.behavior);
  }

  return {
    raw: parts.join(' '),
  };
}
