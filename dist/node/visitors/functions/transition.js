import __ensureTransitionExists from '../../ensure/transitionExists.js';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function transition(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    }));
    args.values = Object.assign({ name: 'default' }, args.values);
    __ensureTransitionExists(args.values.name);
    const transitionArgs = env.transitions[args.values.name];
    const parts = [];
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
//# sourceMappingURL=transition.js.map