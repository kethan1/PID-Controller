import fs from "fs";
import os from "os";
/*
    Use import() to load this module from commonjs.
    https://nodejs.org/api/esm.html#esm_import_expression
*/
export default class PID {
    constructor(P = 1, I = 0, D = 0, debug = true, file = "PIDvars.csv") {
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
    update(target, current) {
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
            this.D * (error - this.prevError),
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
