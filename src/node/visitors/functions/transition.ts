import __ensureTransitionExists from '../../ensure/transitionExists.js';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

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
