import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function typo(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments, ['name'], {
    separator: ['white-space', 'comma'],
  });

  const typosArgs = env.typos;

  if (!typosArgs[args.name]) {
    throw new Error(
      `The requested "${
        args.name
      }" typo is not available. Here's the registered ones: ${Object.keys(
        env.typos,
      ).join(',')}`,
    );
  }

  const typoArgs = typosArgs[args.name];

  // size and line-height
  let size: string | number = '1em',
    lineHeight: string | number = '1em';
  if (typoArgs.size) {
    if (`${typoArgs.size}`.match(/^[0-9]+$/)) {
      size = `${typoArgs.size}px`;
    } else {
      size = typoArgs.size;
    }
  }
  if (typoArgs.lineHeight) {
    if (`${typoArgs.lineHeight}`.match(/^[0-9]+$/)) {
      lineHeight = `${typoArgs.lineHeight}px`;
    } else {
      lineHeight = typoArgs.lineHeight;
    }
  }

  const props: (string | number)[] = [];
  props.push(typoArgs.style ?? 'normal');
  props.push(typoArgs.variant ?? 'normal');
  props.push(typoArgs.weight ?? 'normal');
  props.push(typoArgs.stretch ?? 'normal');
  props.push(`${size}/${lineHeight}`);
  props.push(typoArgs.family ?? 'sans-serif');
  return {
    raw: props.join(' '),
  };
}
