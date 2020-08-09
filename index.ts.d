export interface ConfusablePoint {
  point: string;
  similarTo?: string;
}
export declare const isConfusing: (input: string) => boolean;
export declare const confusables: (input: string) => ConfusablePoint[];
export declare const rectifyConfusion: (input: string) => string;
