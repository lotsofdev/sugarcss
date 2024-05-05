import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
export default function fontFamily(value, settings) {
    const args = __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    });
    const fontFamilyArgs = env.fonts.family;
    // protect against invalid easings
    if (!fontFamilyArgs[args.name]) {
        throw new Error(`Invalid font family: ${args.name}. Valid font families are: ${Object.keys(Object.keys(env.fonts.family)).join(', ')}`);
    }
    const families = fontFamilyArgs[args.name];
    return {
        raw: `${families.join(',')}`,
    };
}
//# sourceMappingURL=fontFamily.js.map