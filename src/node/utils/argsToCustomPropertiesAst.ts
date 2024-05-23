export default function argsToCustomPropertiesAst(
  name: string,
  args: any,
): any {
  const result: any[] = [];
  for (let [key, value] of Object.entries(args.ast)) {
    // if (typeof value === 'string') {
    //   continue;
    // }

    result.push({
      property: 'custom',
      value: {
        name: `${name}-${key}`,
        value: [value],
      },
    });
  }

  return result;
}
