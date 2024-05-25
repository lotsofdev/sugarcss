import __parseArgs from '../../utils/parseArgs.js';
import __hideAst from './scrollbar/hide.ast.js';
import __scrollbarAst from './scrollbar/scrollbar.ast.js';
export default function scrollbar(v, settings) {
    // parse args
    const args = __parseArgs(v.prelude);
    if (args.values.arg0 === 'hide') {
        return __hideAst();
    }
    else {
        return __scrollbarAst(args.values.arg0, args.values.arg1.value, args.values.arg2.value);
    }
}
//# sourceMappingURL=scrollbar.js.map