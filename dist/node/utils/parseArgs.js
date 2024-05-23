import { __get, __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';
import __parsedArgsToRawValues from './parsedArgsToRawValues.js';
export default function parseArgs(args, schema = [], settings) {
    var _a, _b, _c, _d, _e, _f;
    const finalSettings = Object.assign({ separator: ['comma', 'white-space'], resolve: true }, (settings !== null && settings !== void 0 ? settings : {}));
    const resultArgs = {};
    let argId = 0, currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
    for (let [i, arg] of args.entries()) {
        switch (arg.type) {
            case 'dashed-ident':
                // handle dashed ident like (--darken 10) etc...
                if (resultArgs[currentProp] === undefined) {
                    resultArgs[currentProp] = {};
                    currentProp = `${currentProp}.${arg.value.replace(/-{1,2}/g, '')}`;
                }
                else {
                    currentProp = arg.value.replace(/-{1,2}/g, '');
                }
                break;
            case 'function':
                if (arg.value.name === 'cubic-bezier') {
                    arg.rawValue = __toString(arg);
                    __set(resultArgs, currentProp, arg);
                }
                else if (env.functions[arg.value.name]) {
                    const v = env.functions[arg.value.name](arg.value);
                    // get the raw value
                    arg.rawValue = (_b = v.raw) !== null && _b !== void 0 ? _b : v;
                    __set(resultArgs, currentProp, arg);
                    // pass to next arg
                    argId++;
                    // set the new currentProp
                    currentProp = (_c = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _c !== void 0 ? _c : `arg${argId}`;
                }
                break;
            case 'token':
                // some tokens to avoid
                const avoid = [
                    'parenthesis-block',
                    'close-parenthesis',
                    'white-space',
                    'comment',
                    'colon',
                    'semicolon',
                ];
                if (avoid.includes(arg.value.type)) {
                    continue;
                }
                const separators = Array.isArray(finalSettings.separator)
                    ? finalSettings.separator
                    : [finalSettings.separator];
                if (separators.includes(arg.value.type)) {
                    currentProp = (_d = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _d !== void 0 ? _d : `arg${argId}`;
                    continue;
                }
                // get the raw value
                arg.rawValue = arg.value.value;
                // set the value into the resultArgs
                __set(resultArgs, currentProp, arg);
                // pass to next arg
                argId++;
                // set the new currentProp
                currentProp = (_e = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _e !== void 0 ? _e : `arg${argId}`;
                break;
            default:
                if (__get(resultArgs, currentProp)) {
                    continue;
                }
                // get the raw value
                arg.rawValue = arg.value.value;
                // handle others
                __set(resultArgs, currentProp, arg);
                // pass to next arg
                argId++;
                // set the new currentProp
                currentProp = (_f = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _f !== void 0 ? _f : `arg${argId}`;
        }
    }
    return {
        ast: resultArgs,
        values: __parsedArgsToRawValues(resultArgs),
    };
}
//# sourceMappingURL=parseArgs.js.map