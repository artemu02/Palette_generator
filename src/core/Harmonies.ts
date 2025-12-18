import { Color } from './Color';

export type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'split-complementary' | 'square';

export class HarmonyGenerator {
    static generate(base: Color, type: HarmonyType): Color[] {
        switch (type) {
            case 'analogous':
                return [
                    base.shiftHue(-30),
                    base,
                    base.shiftHue(30)
                ];
            case 'complementary':
                return [
                    base,
                    base.shiftHue(180)
                ];
            case 'split-complementary':
                return [
                    base,
                    base.shiftHue(150),
                    base.shiftHue(210)
                ];
            case 'triadic':
                return [
                    base,
                    base.shiftHue(120),
                    base.shiftHue(240)
                ];
            case 'square':
                return [
                    base,
                    base.shiftHue(90),
                    base.shiftHue(180),
                    base.shiftHue(270)
                ];
            default:
                return [base];
        }
    }
}
