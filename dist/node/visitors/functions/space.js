import __ensureEasingFunctionExists from '../../ensure/easingFunctionExists.js';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function space(value, settings) {
    const args = __parseArgs(value.arguments, [], {
        separator: ['white-space', 'comma'],
    });
    const spaceArgs = env.spaces;
    let easing = spaceArgs.easing;
    // check if an easing is specified
    for (let [argName, argValue] of Object.entries(args.values)) {
        // if is an easing specified
        if (typeof argValue === 'string' && env.easings[argValue]) {
            easing = argValue;
            continue;
        }
    }
    // protect against invalid easings
    __ensureEasingFunctionExists(spaceArgs.easing);
    // prepare the easing function
    const easingFunction = env.easingFunctions[easing];
    // calculate the delta between min and max
    const spaceDelta = spaceArgs.max - spaceArgs.min;
    const spaces = [];
    for (let [argName, argValue] of Object.entries(args.values)) {
        // skip easing declaration
        if (env.easingFunctions[argName] || typeof argValue !== 'number') {
            continue;
        }
        // get the requested value percentage
        const easingFunctionStr = easingFunction.replace(/t/gm, `${argValue / 100}`);
        const resultCalc = `calc(((${easingFunctionStr}) * ${(spaceDelta / 100) * argValue} + ${spaceArgs.min}) * 1px)`;
        // create the calc declaration
        spaces.push(resultCalc);
    }
    return {
        raw: spaces.join(' '),
    };
}
//# sourceMappingURL=space.js.map