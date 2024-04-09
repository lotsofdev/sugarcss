import { __set } from '@lotsof/sugar/object';

export default function parseArgs(args: any[], schema: string[]): any {
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
        // when comma, pass to the next arg
        if (arg.value.type === 'comma') {
          argId++;
          currentProp = schema?.[argId] ?? `arg${argId}`;
          continue;
        }

        // some tokens to avoid
        const avoid = ['white-space', 'comment', 'colon', 'semicolon'];
        if (avoid.includes(arg.value.type)) {
          continue;
        }

        // set the value into the resultArgs
        __set(resultArgs, currentProp, arg.value.value);

        // set the new currentProp
        currentProp = schema?.[argId] ?? `arg${argId}`;
        break;
    }
  }

  return resultArgs;
}
