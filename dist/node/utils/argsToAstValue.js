import __toAstValue from './toAstValue.js';
export default function argsToCustomProperties(name, args) {
    const result = [];
    for (let [key, value] of Object.entries(args)) {
        result.push({
            property: 'custom',
            value: {
                name: `${name}-${key}`,
                value: __toAstValue(value),
            },
        });
    }
}
//# sourceMappingURL=argsToAstValue.js.map