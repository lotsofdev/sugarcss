export interface IToStringSettings {
    numberFixed: number;
}
export default function toString(value: any, settings?: IToStringSettings): string;
