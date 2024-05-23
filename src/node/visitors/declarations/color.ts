import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';

import { __convert } from '@lotsof/sugar/color';

export default function color(v, settings: ISugarCssSettings): any {
  const name = v.name.replace(`--${settings.prefix}color-`, '');

  const result: any[] = [
    {
      property: `--${settings.prefix}color-${name}`,
      value: {
        name: `--${settings.prefix}color-${name}`,
        value: v.value,
      },
    },
  ];

  const hslaColor = __convert(v.value[0]?.value ?? v.value[0], 'hsla');
  env.colors[name] = hslaColor;

  ['h', 's', 'l', 'a'].forEach((key) => {
    result.push({
      property: `--${settings.prefix}color-${name}-${key}`,
      value: {
        name: `--${settings.prefix}color-${name}-${key}`,
        value: [
          {
            type: 'token',
            value: {
              type: 'number',
              value: hslaColor[key],
            },
          },
        ],
      },
    });
  });

  if (settings.verbose) {
    console.log(
      `Registered color: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        hslaColor,
      )}</yellow>`,
    );
  }

  return result;
}
