import { Color } from './Color';
import { HarmonyGenerator, type HarmonyType } from './Harmonies';
import { ClusterGenerator } from './Clustering';
import { AccessibilityValidator, type ValidationReport } from './Contrast';

export interface GenerationRequest {
    type: 'harmony' | 'image';
    baseColor?: string; // Hex or Oklch string
    harmonyType?: HarmonyType;
    imageData?: ImageData;
    colorCount?: number;
}

export interface Palette {
    colors: Color[];
}

export class PaletteController {
    private clusterGeerator: ClusterGenerator;

    constructor() {
        this.clusterGeerator = new ClusterGenerator(5); // Default 5 colors
    }

    handleGenerationRequest(req: GenerationRequest): Palette {
        if (req.type === 'harmony') {
            if (!req.baseColor || !req.harmonyType) {
                throw new Error('Base color and harmony type required for harmony generation');
            }
            const base = new Color(req.baseColor);
            const colors = HarmonyGenerator.generate(base, req.harmonyType);
            return { colors };
        } else if (req.type === 'image') {
            if (!req.imageData) {
                throw new Error('Image data required for image generation');
            }
            const colors = this.clusterGeerator.generate(req.imageData, {
                k: req.colorCount || 5
            });
            return { colors };
        }
        return { colors: [] };
    }

    handleValidationRequest(palette: Palette, backgroundColor: Color): ValidationReport[] {
        return palette.colors.map(color => AccessibilityValidator.validate(color, backgroundColor));
    }
}
