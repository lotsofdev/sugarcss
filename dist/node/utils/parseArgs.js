import { __set } from '@lotsof/sugar/object';
export default function parseArgs(args, schema = [], settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ separator: 'comma' }, (settings !== null && settings !== void 0 ? settings : {}));
    const resultArgs = {};
    let argId = 0, currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
    for (let [i, arg] of args.entries()) {
        switch (arg.type) {
            case 'dashed-ident':
                // handle dashed ident like (--darken 10) etc...
                if (!resultArgs[currentProp]) {
                    resultArgs[currentProp] = {};
                }
                currentProp = `${currentProp}.${arg.value.replace(/-{1,2}/g, '')}`;
                break;
            case 'token':
            case 'length':
                // when comma, pass to the next arg
                const separators = Array.isArray(finalSettings.separator)
                    ? finalSettings.separator
                    : [finalSettings.separator];
                if (separators.includes(arg.value.type)) {
                    argId++;
                    currentProp = (_b = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _b !== void 0 ? _b : `arg${argId}`;
                    continue;
                }
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
                let value = arg.value.value;
                if (arg.value.unit) {
                    value += arg.value.unit;
                }
                // set the value into the resultArgs
                __set(resultArgs, currentProp, value);
                // set the new currentProp
                currentProp = (_c = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _c !== void 0 ? _c : `arg${argId}`;
                break;
        }
    }
    return resultArgs;
}
//# sourceMappingURL=parseArgs.js.map