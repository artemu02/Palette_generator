import { wcagContrast } from 'culori';
import { Color } from './Color';

export interface ValidationReport {
    isAccessible: boolean;
    contrastRatio: number;
    level: 'AA' | 'AAA' | 'Fail';
}

export class AccessibilityValidator {
    static validate(color1: Color, color2: Color): ValidationReport {
        const ratio = wcagContrast(color1.toHex(), color2.toHex());

        let level: 'AA' | 'AAA' | 'Fail' = 'Fail';
        if (ratio >= 7) level = 'AAA';
        else if (ratio >= 4.5) level = 'AA';

        return {
            isAccessible: ratio >= 4.5,
            contrastRatio: ratio,
            level
        };
    }

    static suggestContrast(base: Color): Color {
        // Simple logic: if contrast is low, darken or lighten base until it passes?
        // For now, just return base, but in a real app this would iterate.
        return base;
    }
    static validatePalette(colors: Color[]): { pair: [Color, Color], report: ValidationReport }[] {
        const results: { pair: [Color, Color], report: ValidationReport }[] = [];

        for (let i = 0; i < colors.length; i++) {
            for (let j = i + 1; j < colors.length; j++) {
                results.push({
                    pair: [colors[i], colors[j]],
                    report: this.validate(colors[i], colors[j])
                });
            }
        }
        return results;
    }
}
