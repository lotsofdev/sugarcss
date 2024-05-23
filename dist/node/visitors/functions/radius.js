import __ensureRadiusExists from '../../ensure/radiusExists.js';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function radius(value, settings) {
    const args = Object.assign({}, __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    }));
    args.values = Object.assign({ name: 'default' }, args.values);
    __ensureRadiusExists(args.values.name);
    const radius = env.radiuses[args.values.name].ast;
    return Object.values(radius);
}
//# sourceMappingURL=radius.js.map