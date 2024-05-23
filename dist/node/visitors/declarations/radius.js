import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function radius(v, settings) {
    const name = v.name.replace(`--${settings.prefix}radius-`, ''), args = __parseArgs(v.value, [], {
        separator: ['white-space', 'comma'],
    });
    const values = {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0,
        ast: args.ast,
    };
    // adding spaces between each ast nodes
    // @TODO          find a better way to do this
    const newAst = {};
    for (let [key, value] of Object.entries(args.ast)) {
        newAst[key] = value;
        newAst[`space-${key}`] = {
            type: 'token',
            value: {
                type: 'white-space',
                value: ' ',
            },
        };
    }
    values.ast = newAst;
    if (Object.keys(args.values).length === 1) {
        values.topLeft = args.values.arg0;
        values.topRight = args.values.arg0;
        values.bottomRight = args.values.arg0;
        values.bottomLeft = args.values.arg0;
    }
    else if (Object.keys(args.values).length === 4) {
        values.topLeft = args.values.arg0;
        values.topRight = args.values.arg1;
        values.bottomRight = args.values.arg2;
        values.bottomLeft = args.values.arg3;
    }
    else {
        throw new Error(`Invalid number of arguments for radius: ${args.values.length}. Either 1 value applied on all corners, or 4 values, 1 for each corner.`);
    }
    env.radiuses[name] = values;
    const displayValues = Object.assign({}, values);
    delete displayValues.ast;
    if (settings.verbose) {
        console.log(`Registered radius: <cyan>${name}</cyan>: <yellow>${JSON.stringify(displayValues)}</yellow>`);
    }
    return [];
}
//# sourceMappingURL=radius.js.map