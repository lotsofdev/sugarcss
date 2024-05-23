import __ensureRadiusExists from '../../ensure/radiusExists.js';
import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function radius(value: any, settings: ISugarCssSettings): any {
  const args = {
    ...__parseArgs(value.arguments, ['name'], {
      separator: ['white-space', 'comma'],
    }),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

  __ensureRadiusExists(args.values.name);
  const radius = env.radiuses[args.values.name].ast;
  return Object.values(radius);
}
