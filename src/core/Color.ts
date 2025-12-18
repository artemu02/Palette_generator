import { formatHex, converter, type Oklch, parse } from 'culori';

const toOklch = converter('oklch');

export class Color {
    private _oklch: Oklch;

    constructor(input: string | object) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parsed: any = input;
        if (typeof input === 'string') {
            parsed = parse(input);
        }

        if (!parsed) {
            // Fallback or error. For now, default to black if invalid to avoid crashing.
            console.warn(`Invalid color input: ${JSON.stringify(input)}, defaulting to black`);
            this._oklch = { mode: 'oklch', l: 0, c: 0, h: 0 };
        } else {
            this._oklch = toOklch(parsed);
        }
    }

    toHex(): string {
        return formatHex(this._oklch);
    }

    toOklchString(): string {
        const { l, c, h } = this._oklch;
        return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h?.toFixed(3) || 0})`;
    }

    get oklch(): Oklch {
        return { ...this._oklch };
    }

    // Create a new Color instance with modified properties
    with(changes: Partial<Oklch>): Color {
        return new Color({ ...this._oklch, ...changes });
    }

    shiftHue(degrees: number): Color {
        let h = (this._oklch.h || 0) + degrees;
        // Normalize hue
        h = h % 360;
        if (h < 0) h += 360;
        return this.with({ h });
    }
}
