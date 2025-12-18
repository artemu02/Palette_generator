import type { Palette } from '../core/PaletteController';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface PaletteDisplayProps {
    palette: Palette;
}

export function PaletteDisplay({ palette }: PaletteDisplayProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 2000);
    };

    if (palette.colors.length === 0) return null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                {palette.colors.map((color, index) => {
                    const hex = color.toHex().toUpperCase();
                    const { l } = color.oklch;
                    // Determine text color based on lightness for visibility
                    const textColor = l > 0.6 ? '#000000' : '#ffffff';

                    return (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}
                        >
                            <div
                                onClick={() => handleCopy(hex)}
                                style={{
                                    backgroundColor: hex,
                                    height: '150px',
                                    borderRadius: 'var(--radius-lg)',
                                    cursor: 'pointer',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.2s',
                                    color: textColor,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                className="color-card"
                            >
                                {copied === hex && <Check />}
                            </div>

                            {/* Monochromatic variations */}
                            <div style={{ display: 'flex', height: '32px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                {[
                                    color.with({ l: Math.max(0, l - 0.2) }),
                                    color.with({ l: Math.max(0, l - 0.1) }),
                                    color,
                                    color.with({ l: Math.min(1, l + 0.1) }),
                                    color.with({ l: Math.min(1, l + 0.2) })
                                ].map((shade, i) => {
                                    const shadeHex = shade.toHex().toUpperCase();
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => handleCopy(shadeHex)}
                                            title={shadeHex}
                                            style={{
                                                flex: 1,
                                                backgroundColor: shadeHex,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {copied === shadeHex && <Check size={12} color={shade.oklch.l > 0.6 ? 'black' : 'white'} />}
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{hex}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    {color.toOklchString().replace('oklch(', '').replace(')', '')}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
