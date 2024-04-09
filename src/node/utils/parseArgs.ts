import { __set } from '@lotsof/sugar/object';

export interface IParseArgsSettings {
  separator: string | string[];
}

export default function parseArgs(
  args: any[],
  schema: string[] = [],
  settings?: Partial<IParseArgsSettings>,
): any {
  const finalSettings: IParseArgsSettings = {
    separator: 'comma',
    ...(settings ?? {}),
  };

  const resultArgs = {};

  let argId = 0,
    currentProp = schema?.[argId] ?? `arg${argId}`;

  for (let [i, arg] of args.entries()) {
    switch (arg.type) {
      case 'dashed-ident':
        // handle dashed ident like (--darken 10) etc...
        if (!resultArgs[currentProp]) {
          resultArgs[currentProp] = {};
        }
        currentProp = `${currentProp}.${arg.value.replace(/-{1,2}/g, '')}`;
        break;
      case 'token':
      case 'length':
        // when comma, pass to the next arg

        const separators = Array.isArray(finalSettings.separator)
          ? finalSettings.separator
          : [finalSettings.separator];

        if (separators.includes(arg.value.type)) {
          argId++;
          currentProp = schema?.[argId] ?? `arg${argId}`;
          continue;
        }

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

        let value = arg.value.value;
        if (arg.value.unit) {
          value += arg.value.unit;
        }

        // set the value into the resultArgs
        __set(resultArgs, currentProp, value);

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
        break;
    }
  }

  return resultArgs;
}
