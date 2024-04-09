import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function media(v, settings: ISugarCssSettings): any {
  const media = v.name.replace(`--${settings.prefix}media-`, ''),
    args = __parseArgs(v.value, ['min', 'max'], {
      separator: ['white-space', 'comma'],
    });

  env.medias[media] = args;

  if (settings.verbose) {
    console.log(
      `Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(
        args,
      )}</yellow>`,
    );
  }

  return [];
}
