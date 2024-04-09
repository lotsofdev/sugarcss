import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';

export default function media(v: any, settings: ISugarCssSettings): any {
  const possibleMedias: string[] = [];
  [''].forEach((operator) => {
    for (let [media, mediaArgs] of Object.entries(env.medias)) {
      possibleMedias.push(`${operator}${media}`);
    }
  });

  if (['dark', 'light'].includes(v.mediaType)) {
    switch (v.mediaType) {
      case 'dark':
        v.mediaType = '(prefers-color-scheme: dark)';
        break;
      case 'light':
        v.mediaType = '(prefers-color-scheme: light)';
        break;
    }
  } else if (env.medias[v.mediaType]) {
    const mediaArgs = env.medias[v.mediaType];

    let query = '';

    if (settings.mobileFirst) {
      if (mediaArgs.min) {
        query += query ? ' and ' : '';
        query += `(min-width: ${mediaArgs.min})`;
      }
    } else {
      if (mediaArgs.max) {
        query += query ? ' and ' : '';
        query += `(max-width: ${mediaArgs.max})`;
      }
    }

    v.mediaType = query;
  }

  return v;
}
