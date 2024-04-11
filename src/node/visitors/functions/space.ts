import { env } from '../../sugarcss.js';
import { ISugarCssSettings } from '../../sugarcss.types';
import __parseArgs from '../../utils/parseArgs.js';

export default function space(value: any, settings: ISugarCssSettings): any {
  const args = __parseArgs(value.arguments, [], {
    separator: ['white-space', 'comma'],
  });

  const spaceArgs = env.spaces;

  let easing = spaceArgs.easing;

  // check if an easing is specified
  for (let [argName, argValue] of Object.entries(args)) {
    // if is an easing specified
    if (env.easings[argName]) {
      easing = argName;
      continue;
    }
  }

  // protect against invalid easings
  if (!env.easings[spaceArgs.easing]) {
    throw new Error(
      `Invalid easing: ${spaceArgs.easing}. Valid easings are: ${Object.keys(
        env.easings,
      ).join(', ')}`,
    );
  }

  // prepare the easing function
  const easingFunction = env.easings[easing];

  // calculate the delta between min and max
  const spaceDelta = spaceArgs.max - spaceArgs.min;

  const spaces: string[] = [];
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
      (spaceDelta / 100) * argValue
    } + ${spaceArgs.min}) * 1px)`;

    // create the calc declaration
    spaces.push(resultCalc);
  }

  return {
    raw: spaces.join(' '),
  };
}
