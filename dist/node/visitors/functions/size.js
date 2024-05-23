import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __ensureEasingFunctionExists from '../../ensure/easingFunctionExists.js';
export default function size(value, settings) {
    const args = __parseArgs(value.arguments, [], {
        separator: ['white-space', 'comma'],
    });
    const sizeArgs = env.sizes;
    let easing = sizeArgs.easing;
    // check if an easing is specified
    for (let [argName, argValue] of Object.entries(args.values)) {
        // if is an easing specified
        if (typeof argValue === 'string') {
            if (env.easingFunctions[argValue]) {
                easing = argValue;
                continue;
            }
        }
    }
    // protect against invalid easings
    __ensureEasingFunctionExists(sizeArgs.easing);
    // prepare the easing function
    const easingFunction = env.easingFunctions[easing];
    // calculate the delta between min and max
    const sizeDelta = sizeArgs.max - sizeArgs.min;
    const sizes = [];
    for (let [argName, argValue] of Object.entries(args.values)) {
        // skip easing declaration
        if (env.easings[argName] || typeof argValue !== 'number') {
            continue;
        }
        // get the requested value percentage
        const easingFunctionStr = easingFunction.replace(/t/gm, `${argValue / 100}`);
        const resultCalc = `calc(((${easingFunctionStr}) * ${(sizeDelta / 100) * argValue} + ${sizeArgs.min}) * 1px)`;
        // create the calc declaration
        sizes.push(resultCalc);
    }
    return {
        raw: sizes.join(' '),
    };
}
//# sourceMappingURL=size.js.map