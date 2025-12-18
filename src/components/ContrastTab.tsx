import { useState } from 'react';
import { Color } from '../core/Color';
import { AccessibilityValidator } from '../core/Contrast';
import { Check, AlertTriangle, Upload, Plus, Trash2 } from 'lucide-react';

interface ContrastTabProps {
    inputText: string;
    setInputText: (text: string) => void;
    colors: Color[];
    setColors: React.Dispatch<React.SetStateAction<Color[]>>;
}

export function ContrastTab({ inputText, setInputText, colors, setColors }: ContrastTabProps) {
    const [error, setError] = useState<string | null>(null);

    const handleAddColor = () => {
        try {
            // Try to split by lines or commas and parse all
            const rawColors = inputText.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
            const newColors: Color[] = [];

            for (const c of rawColors) {
                try {
                    newColors.push(new Color(c));
                } catch {
                    // Ignore invalid
                }
            }

            if (newColors.length === 0 && rawColors.length > 0) {
                setError("Допустимі кольори не знайдені");
                return;
            }

            setColors(prev => [...prev, ...newColors]);
            setInputText('');
            setError(null);
        } catch {
            setError('Невірний формат кольору');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            // Simple regex to extract hex codes and rgb/hsl
            const hexMatches = content.match(/#[0-9a-fA-F]{3,8}/g) || [];
            // Basic regex for functional notation (rgb, hsl, etc) - simplified
            const funcMatches = content.match(/(rgb|hsl|oklch)\([^)]+\)/g) || [];

            const foundColors = [...hexMatches, ...funcMatches];
            const newColors: Color[] = [];

            foundColors.forEach(c => {
                try {
                    newColors.push(new Color(c));
                } catch { /* skip */ }
            });

            setColors(prev => [...prev, ...newColors]);
        };
        reader.readAsText(file);
    };

    const removeColor = (index: number) => {
        setColors(prev => prev.filter((_, i) => i !== index));
    };

    const report = AccessibilityValidator.validatePalette(colors);
    const avgRatio = report.length > 0
        ? report.reduce((acc, item) => acc + item.report.contrastRatio, 0) / report.length
        : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>

            {/* Input Section */}
            <div style={{
                backgroundColor: '#f9f9f9',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                gap: 'var(--spacing-xl)',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Додати Кольори</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="#FFFFFF, #000000, rgb(255,0,0)"
                            style={{
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                        />
                        {error && <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>}
                        <button
                            onClick={handleAddColor}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 500
                            }}
                        >
                            <Plus size={18} /> Додати
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Або імпортуйте з файлу (CSS/JSON)</span>
                        <label style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--accent-color)',
                            fontWeight: 500
                        }}>
                            <Upload size={18} />
                            Завантажити
                            <input type="file" onChange={handleFileUpload} accept=".css,.json,.txt" style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
                            Поточний Список <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.9em', marginLeft: '4px' }}>{colors.length}</span>
                        </h3>
                        <button onClick={() => setColors([])} style={{ border: 'none', background: 'none', color: 'red', fontSize: '0.875rem', cursor: 'pointer' }}>Очистити Все</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                        {colors.map((c, i) => (
                            <div key={i} style={{
                                position: 'relative',
                                height: '60px',
                                backgroundColor: c.toHex(),
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ddd',
                                cursor: 'pointer'
                            }}
                                title={c.toHex()}
                                onClick={() => removeColor(i)}
                            >
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                >
                                    <Trash2 size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div>
                <div style={{
                    marginBottom: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 500 }}>Середній Контраст</span>
                    <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>
                        {avgRatio.toFixed(2)}:1
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {report.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'var(--spacing-md)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: item.pair[0].toHex(), border: '1px solid #ddd' }} />
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: item.pair[1].toHex(), border: '1px solid #ddd' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.pair[0].toHex()} vs {item.pair[1].toHex()}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Співвідношення: {item.report.contrastRatio.toFixed(2)}:1</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                {item.report.isAccessible ? (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 12px',
                                        backgroundColor: '#DCFCE7',
                                        color: '#166534',
                                        borderRadius: '999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}>
                                        <Check size={16} /> Пройдено {item.report.level}
                                    </span>
                                ) : (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 12px',
                                        backgroundColor: '#FEE2E2',
                                        color: '#991B1B',
                                        borderRadius: '999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}>
                                        <AlertTriangle size={16} /> Провал
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {colors.length > 0 && report.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Додайте більше кольорів для перевірки комбінацій.</p>
                    )}
                    {colors.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Додайте кольори для аналізу контрасту.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
