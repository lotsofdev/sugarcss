import __parseArgs from '../../utils/parseArgs.js';
export default function theme(v, settings) {
    const args = __parseArgs(v.prelude, ['cs']);
    return [
        {
            type: 'media',
            value: {
                rules: v.block,
                block: v.block,
                loc: v.loc,
                query: {
                    mediaQueries: [{ raw: '(min-width: 500px)' }],
                },
            },
        },
    ];
    //   console.log(JSON.stringify(v, null, 2));
    return {
        type: 'media',
        value: {
            rules: v.block,
            loc: v.loc,
            query: {
                mediaQueries: [{ raw: '(min-width: 500px)' }],
            },
        },
    };
}
//# sourceMappingURL=theme.js.map