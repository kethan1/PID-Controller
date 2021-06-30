export default class PID {
    D: number;
    I: number;
    P: number;
    debug: boolean;
    iAccumulator: number;
    prevError: number;
    first: boolean;
    file: string;
    sTime: number;
    constructor(P?: number, I?: number, D?: number, debug?: boolean, file?: string);
    update(target: number, current: number): number;
    reset(): void;
}
