import fs from "fs";
import os from "os";


/*
    Use import() to load this module from commonjs. 
    https://nodejs.org/api/esm.html#esm_import_expression
*/
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

    constructor(P: number = 1, I: number = 0, D: number = 0, debug: boolean = true, file: string = "PIDvars.csv") {
        this.P = P;
        this.I = I;
        this.D = D;
        this.debug = debug;
        this.iAccumulator = 0;
        this.prevError = 0;
        this.first = true;
        this.file = file;
        fs.writeFileSync(this.file, `Equation,I Accumulator,Error,Prev Error,P With Error,I with I Accumulator,D with Prev Error,Setpoint,Time${os.EOL}`);
    }

    update(target: number, current: number) {
        let error = target - current;
        this.iAccumulator += error;
        if (this.first) {
            this.iAccumulator = 0;
            this.prevError = error;
            this.first = false;
            this.sTime = new Date().getTime() / 1000;
        }
        let output = (this.P * error) + (this.iAccumulator * this.I) + ((error - this.prevError) * this.D);
        fs.appendFileSync(this.file, [
            output,
            this.iAccumulator,
            error,
            this.prevError,
            this.P * error,
            this.I * this.iAccumulator,
            this.D * (error-this.prevError),
            target,
            current,
            (new Date().getTime() / 1000) - this.sTime
        ].join(",") + os.EOL);
        return output;
    }

    reset() {
        this.first = true;
    }
}
