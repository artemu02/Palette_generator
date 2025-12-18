/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'culori' {
    export function formatHex(color: any): string;
    export function converter(mode: string): (color: any) => any;
    export function parse(color: any): any;
    export function wcagContrast(color1: any, color2: any): number;
    export function differenceEuclidean(color1: any, color2: any): number;

    export interface Oklch {
        mode: 'oklch';
        l: number;
        c: number;
        h?: number;
    }

    export interface Oklab {
        mode: 'oklab';
        l: number;
        a: number;
        b: number;
    }

    export interface Rgb {
        mode: 'rgb';
        r: number;
        g: number;
        b: number;
    }
}
