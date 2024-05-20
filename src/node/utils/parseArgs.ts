import { __get, __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';

export interface IParseArgsSettings {
  separator: string | string[];
  resolve: boolean;
  defaults: Record<string, any>;
}

export default function parseArgs(
  args: any[],
  schema: string[] = [],
  settings?: Partial<IParseArgsSettings>,
): any {
  const finalSettings: IParseArgsSettings = {
    separator: ['comma', 'white-space'],
    resolve: true,
    ...(settings ?? {}),
  };

  const resultArgs = {};

  function needResolve(prop: string) {
    return (
      finalSettings.resolve === true ||
      (Array.isArray(finalSettings.resolve) &&
        finalSettings.resolve?.includes(prop))
    );
  }

  let argId = 0,
    value,
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
          if (needResolve(currentProp)) {
            const easing = __toString(arg);
            __set(resultArgs, currentProp, easing);
          } else {
            __set(resultArgs, currentProp, arg.value);
          }
        } else if (env.functions[arg.value.name]) {
          const v = env.functions[arg.value.name](arg.value);
          // set the value into the resultArgs
          __set(resultArgs, currentProp, v.raw ?? v);

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

        // get the value
        value = arg.value;

        // handle "resolve" setting
        if (needResolve(currentProp)) {
          value = value.value;
        }

        // set the value into the resultArgs
        __set(resultArgs, currentProp, value);

        // pass to next arg
        argId++;

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
        break;
      default:
        if (__get(resultArgs, currentProp)) {
          continue;
        }

        // get the value
        value = arg.value;

        // handle "resolve" setting
        if (needResolve(currentProp)) {
          value = value.value;
        }

        // handle others
        __set(resultArgs, currentProp, value);

        // pass to next arg
        argId++;

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
    }
  }

  return resultArgs;
}
