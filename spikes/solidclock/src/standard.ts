import { Arc, arc, DefaultArcObject } from "d3-shape";

declare module "d3-shape" {
    interface Arc<This, Datum> {
        /**
         * Sets the number of decimal places to use when formatting angles in degrees.
         *
         * @param digits Number of decimal places.
         */
        digits(digits: number): this;
    }
}

export function defaultArcGenerator(): Arc<any, DefaultArcObject> {
    return arc().digits(1);
}