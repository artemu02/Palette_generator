import type { Palette } from '../core/PaletteController';

export class ExportService {
    static exportToCss(palette: Palette): Blob {
        const cssVars = palette.colors.map((c, i) => `  --color-${i + 1}: ${c.toHex()};`).join('\n');
        const content = `:root {\n${cssVars}\n}`;
        return new Blob([content], { type: 'text/css' });
    }

    static exportToJson(palette: Palette): Blob {
        const data = palette.colors.map(c => c.toHex());
        return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    }

    static download(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
