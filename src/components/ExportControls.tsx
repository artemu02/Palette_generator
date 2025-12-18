import type { Palette } from '../core/PaletteController';
import { ExportService } from '../services/ExportService';
import { Download } from 'lucide-react';

interface ExportControlsProps {
    palette: Palette;
}

export function ExportControls({ palette }: ExportControlsProps) {
    if (palette.colors.length === 0) return null;

    const handleExport = (type: 'css' | 'json') => {
        if (type === 'css') {
            const blob = ExportService.exportToCss(palette);
            ExportService.download(blob, 'palette.css');
        } else {
            const blob = ExportService.exportToJson(palette);
            ExportService.download(blob, 'palette.json');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-xl)' }}>
            <button
                onClick={() => handleExport('css')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '2px solid #000',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                <Download size={16} /> Експорт CSS
            </button>
            <button
                onClick={() => handleExport('json')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '2px solid #000',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                Експорт JSON
            </button>
        </div>
    );
}
