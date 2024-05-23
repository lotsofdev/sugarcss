import { env } from '../sugarcss.js';
export default function easingFunctionExists(name) {
    if (!env.easingFunctions[name]) {
        throw new Error(`The requested "${name}" easing function is not available. Here's the registered ones: ${Object.keys(env.easingFunctions).join(',')}`);
    }
    return true;
}
//# sourceMappingURL=easingFunctionExists.js.map