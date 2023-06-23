/**
 * bulk drawing spirographs from import/csv/other
 */

import p5 from "p5";
import { getSpirographFnByRatio } from "./util";
import { PfnDrawControl, getPfnDrawFn, range } from "../pfn";
import { rotate } from "../pfn/lib";
import _ from "lodash";

const EXAMPLE = '0.625,0.333333,900,100\n0.625,0.335,900,100';

export function bulk(p: p5) {
    const CANVAS_WIDTH = 2400;
    const CANVAS_HEIGHT = 1800;
    let spiros: PfnDrawControl[];
    let si = 0;
    const initialColor = [206, 112, 112] as const;
    const oscColor = [156, 20, 215] as const;
    // todo: move
    const strokeClosure = (leftColor: readonly [number, number, number], rightColor: readonly [number, number, number]) => {
        // vector math. oscillate color on a straight 'vector' between left and right color
        const lv = new p5.Vector(...leftColor);
        const rv = new p5.Vector(...rightColor);
        const towards = rv.copy().sub(lv);
        const oscPeriodConstant = 12; // control speed of color oscillation
        const oscFactor = (t: number) => (0.5 - 0.5 * Math.cos(t / oscPeriodConstant)); // scalar on towards, to oscillate between 0 and 1

        return (i: number) => () => {
            const oc = lv.copy().add(towards.copy().mult(oscFactor(i*0.2))).array();
            p.stroke(oc);
        };
    };
    const stroke = strokeClosure(initialColor, oscColor);

    p.setup = () => {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        p.background(249); // clear the screen
        p.frameRate(30);

        const ls = range(0.2, 0.9, 0.0046);
        spiros = ls
            .reverse()
            .map(([l, _, lp]) => getSpirographFnByRatio(l, 0.33333, 900 - 60*lp))
            .map((spiro, i) => rotate(spiro, { thetaFn: () => 0.01 * i}))
            .map((pfn, i) => getPfnDrawFn(p, pfn, {
                tStep: 0.005,
                frameRateMult: 32,
                nSteps: 1300,
                stroke: stroke(i),
            }));
        console.log(`drawing ${spiros.length} spiros`)
    };

    p.draw = () => {
        // done
        if (si === spiros.length) {
            return;
        }

        const sfn = spiros[si];

        if (sfn.isStopped()) {
            si++;
        }

        sfn.draw();
    };
}