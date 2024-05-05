import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function font(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments, ['name'], {
    separator: ['white-space', 'comma'],
  });

  const fontsArgs = env.fonts.fonts;

  if (!fontsArgs[args.name]) {
    throw new Error(
      `The requested "${
        args.name
      }" font is not available. Here's the registered ones: ${Object.keys(
        env.fonts.fonts,
      ).join(',')}`,
    );
  }

  const fontArgs = fontsArgs[args.name];

  // size and line-height
  let size: string | number = '1em',
    lineHeight: string | number = '1em';
  if (fontArgs.size) {
    if (`${fontArgs.size}`.match(/^[0-9]+$/)) {
      size = `${fontArgs.size}px`;
    } else {
      size = fontArgs.size;
    }
  }
  if (fontArgs.lineHeight) {
    if (`${fontArgs.lineHeight}`.match(/^[0-9]+$/)) {
      lineHeight = `${fontArgs.lineHeight}px`;
    } else {
      lineHeight = fontArgs.lineHeight;
    }
  }

  const props: (string | number)[] = [];
  props.push(fontArgs.style ?? 'normal');
  props.push(fontArgs.variant ?? 'normal');
  props.push(fontArgs.weight ?? 'normal');
  props.push(fontArgs.stretch ?? 'normal');
  props.push(`${size}/${lineHeight}`);
  props.push(fontArgs.family ?? 'sans-serif');
  return {
    raw: props.join(' '),
  };
}
