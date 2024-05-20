export interface IParseArgsSettings {
    separator: string | string[];
    resolve: boolean;
    defaults: Record<string, any>;
}
export default function parseArgs(args: any[], schema?: string[], settings?: Partial<IParseArgsSettings>): any;