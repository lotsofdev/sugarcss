import __ensureRadiusExists from '../../ensure/radiusExists.js';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-radius
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a radius from the radiuses registered ones.
 *
 * @param      {String}        radius         The radius name you want to apply from registered ones
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px 10px 12px 34px;
 * }
 *
 * .my-element {
 *    border-radius: s-radius();
 *    border-radius: s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
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