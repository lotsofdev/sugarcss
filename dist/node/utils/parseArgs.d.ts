export interface IParseArgsResult {
    ast: any;
    values: any;
}
export interface IParseArgsSettings {
    separator: string | string[];
    resolve: boolean;
}
export default function parseArgs(args: any[], schema?: string[], settings?: Partial<IParseArgsSettings>): IParseArgsResult;
