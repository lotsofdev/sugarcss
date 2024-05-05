import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function typo(value, settings) {
    var _a, _b, _c, _d, _e;
    const args = __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    });
    const typosArgs = env.typos;
    if (!typosArgs[args.name]) {
        throw new Error(`The requested "${args.name}" typo is not available. Here's the registered ones: ${Object.keys(env.typos).join(',')}`);
    }
    const typoArgs = typosArgs[args.name];
    // size and line-height
    let size = '1em', lineHeight = '1em';
    if (typoArgs.size) {
        if (`${typoArgs.size}`.match(/^[0-9]+$/)) {
            size = `${typoArgs.size}px`;
        }
        else {
            size = typoArgs.size;
        }
    }
    if (typoArgs.lineHeight) {
        if (`${typoArgs.lineHeight}`.match(/^[0-9]+$/)) {
            lineHeight = `${typoArgs.lineHeight}px`;
        }
        else {
            lineHeight = typoArgs.lineHeight;
        }
    }
    const props = [];
    props.push((_a = typoArgs.style) !== null && _a !== void 0 ? _a : 'normal');
    props.push((_b = typoArgs.variant) !== null && _b !== void 0 ? _b : 'normal');
    props.push((_c = typoArgs.weight) !== null && _c !== void 0 ? _c : 'normal');
    props.push((_d = typoArgs.stretch) !== null && _d !== void 0 ? _d : 'normal');
    props.push(`${size}/${lineHeight}`);
    props.push((_e = typoArgs.family) !== null && _e !== void 0 ? _e : 'sans-serif');
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=typo.js.map