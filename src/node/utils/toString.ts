export interface IToStringSettings {
  numberFixed: number;
}

export default function toString(
  value: any,
  settings?: IToStringSettings,
): string {
  const finalSettings: IToStringSettings = {
    numberFixed: 3,
    ...(settings ?? {}),
  };

  const parts: string[] = [];

  switch (value.type.toLowerCase()) {
    case 'token':
      return toString(value.value);
      break;
    case 'number':
      return `${value.value.toFixed(finalSettings.numberFixed)}${
        value.unit ?? ''
      }`;
      break;
    case 'comma':
      parts.push(',');
      break;
    case 'function':
      parts.push(`${value.value.name}(`);
      for (let arg of value.value.arguments) {
        parts.push(toString(arg));
      }
      parts.push(')');
      break;
  }

  return parts.join('');
}
