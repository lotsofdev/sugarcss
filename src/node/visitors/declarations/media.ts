import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function media(v, settings: ISugarCssSettings): any {
  const media = v.name.replace(`--${settings.prefix}media-`, ''),
    args = __parseArgs(v.value, ['min', 'max'], {
      separator: ['white-space', 'comma'],
    });

  if (!env.medias[media]) {
    env.medias[media] = {};
  }

  env.medias[media].min = args.values.min ?? 0;
  env.medias[media].max = args.values.max ?? 0;

  if (settings.verbose) {
    console.log(
      `Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(
        env.medias[media],
      )}</yellow>`,
    );
  }

  return [];
}
