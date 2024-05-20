import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

import __ensureEasingExists from '../../ensure/easingExists.js';

export default function size(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments, [], {
    separator: ['white-space', 'comma'],
  });

  const sizeArgs = env.sizes;

  let easing = sizeArgs.easing;

  // check if an easing is specified
  for (let [argName, argValue] of Object.entries(args)) {
    // if is an easing specified
    if (env.easings[argName]) {
      easing = argName;
      continue;
    }
  }

  // protect against invalid easings
  __ensureEasingExists(sizeArgs.easing);

  // prepare the easing function
  const easingFunction = env.easings[easing];

  // calculate the delta between min and max
  const sizeDelta = sizeArgs.max - sizeArgs.min;

  const sizes: string[] = [];
  for (let [argName, argValue] of Object.entries(args)) {
    // skip easing declaration
    if (env.easings[argName] || typeof argValue !== 'number') {
      continue;
    }

    // get the requested value percentage
    const easingFunctionStr = easingFunction.function.replace(
      /t/gm,
      `${argValue / 100}`,
    );

    const resultCalc = `calc(((${easingFunctionStr}) * ${
      (sizeDelta / 100) * argValue
    } + ${sizeArgs.min}) * 1px)`;

    // create the calc declaration
    sizes.push(resultCalc);
  }

  return {
    raw: sizes.join(' '),
  };
}
