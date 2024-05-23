import { __get, __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';

import __parsedArgsToRawValues from './parsedArgsToRawValues.js';

export interface IParseArgsResult {
  ast: any;
  values: any;
}

export interface IParseArgsSettings {
  separator: string | string[];
  resolve: boolean;
}

export default function parseArgs(
  args: any[],
  schema: string[] = [],
  settings?: Partial<IParseArgsSettings>,
): IParseArgsResult {
  const finalSettings: IParseArgsSettings = {
    separator: ['comma', 'white-space'],
    resolve: true,
    ...(settings ?? {}),
  };

  const resultArgs = {};

  let argId = 0,
    currentProp = schema?.[argId] ?? `arg${argId}`;

  for (let [i, arg] of args.entries()) {
    switch (arg.type) {
      case 'dashed-ident':
        // handle dashed ident like (--darken 10) etc...
        if (resultArgs[currentProp] === undefined) {
          resultArgs[currentProp] = {};
          currentProp = `${currentProp}.${arg.value.replace(/-{1,2}/g, '')}`;
        } else {
          currentProp = arg.value.replace(/-{1,2}/g, '');
        }
        break;
      case 'function':
        if (arg.value.name === 'cubic-bezier') {
          arg.rawValue = __toString(arg);
          __set(resultArgs, currentProp, arg);
        } else if (env.functions[arg.value.name]) {
          const v = env.functions[arg.value.name](arg.value);

          // get the raw value
          arg.rawValue = v.raw ?? v;

          __set(resultArgs, currentProp, arg);

          // pass to next arg
          argId++;

          // set the new currentProp
          currentProp = schema?.[argId] ?? `arg${argId}`;
        }

        break;
      case 'token':
        // some tokens to avoid
        const avoid = [
          'parenthesis-block',
          'close-parenthesis',
          'white-space',
          'comment',
          'colon',
          'semicolon',
        ];
        if (avoid.includes(arg.value.type)) {
          continue;
        }

        const separators = Array.isArray(finalSettings.separator)
          ? finalSettings.separator
          : [finalSettings.separator];

        if (separators.includes(arg.value.type)) {
          currentProp = schema?.[argId] ?? `arg${argId}`;
          continue;
        }

        // get the raw value
        arg.rawValue = arg.value.value;

        // set the value into the resultArgs
        __set(resultArgs, currentProp, arg);

        // pass to next arg
        argId++;

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
        break;
      default:
        if (__get(resultArgs, currentProp)) {
          continue;
        }

        // get the raw value
        arg.rawValue = arg.value.value;

        // handle others
        __set(resultArgs, currentProp, arg);

        // pass to next arg
        argId++;

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
    }
  }

  return {
    ast: resultArgs,
    values: __parsedArgsToRawValues(resultArgs),
  };
}
