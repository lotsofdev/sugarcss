import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __ensureFontExists from '../../ensure/fontExists.js';
export default function font(value, settings) {
    var _a, _b, _c, _d, _e;
    const args = __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    });
    const fontsArgs = env.fonts.fonts;
    __ensureFontExists(args.name);
    const fontArgs = fontsArgs[args.name];
    // size and line-height
    let size = '1em', lineHeight = '1em';
    if (fontArgs.size) {
        if (`${fontArgs.size}`.match(/^[0-9]+$/)) {
            size = `${fontArgs.size}px`;
        }
        else {
            size = fontArgs.size;
        }
    }
    if (fontArgs.lineHeight) {
        if (`${fontArgs.lineHeight}`.match(/^[0-9]+$/)) {
            lineHeight = `${fontArgs.lineHeight}px`;
        }
        else {
            lineHeight = fontArgs.lineHeight;
        }
    }
    const props = [];
    props.push((_a = fontArgs.style) !== null && _a !== void 0 ? _a : 'normal');
    props.push((_b = fontArgs.variant) !== null && _b !== void 0 ? _b : 'normal');
    props.push((_c = fontArgs.weight) !== null && _c !== void 0 ? _c : 'normal');
    props.push((_d = fontArgs.stretch) !== null && _d !== void 0 ? _d : 'normal');
    props.push(`${size}/${lineHeight}`);
    props.push((_e = fontArgs.family) !== null && _e !== void 0 ? _e : 'sans-serif');
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=font.js.map