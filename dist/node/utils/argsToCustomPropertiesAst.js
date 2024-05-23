export default function argsToCustomPropertiesAst(name, args) {
    const result = [];
    for (let [key, value] of Object.entries(args.ast)) {
        // if (typeof value === 'string') {
        //   continue;
        // }
        result.push({
            property: 'custom',
            value: {
                name: `${name}-${key}`,
                value: [value],
            },
        });
    }
    return result;
}
//# sourceMappingURL=argsToCustomPropertiesAst.js.map