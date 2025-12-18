import type { HarmonyType } from '../core/Harmonies';

interface ControlsProps {
    baseColor: string;
    setBaseColor: (c: string) => void;
    harmony: HarmonyType;
    setHarmony: (h: HarmonyType) => void;
    mode: 'manual' | 'image' | 'contrast' | 'preview';
    setMode: (m: 'manual' | 'image' | 'contrast' | 'preview') => void;
    onClear?: () => void;
}

export function Controls({ baseColor, setBaseColor, harmony, setHarmony, mode, setMode, onClear }: ControlsProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-lg)',
            backgroundColor: '#f9f9f9',
            borderRadius: 'var(--radius-lg)'
        }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-md)' }}>
                <button
                    onClick={() => setMode('manual')}
                    style={{
                        border: 'none',
                        background: 'none',
                        fontWeight: mode === 'manual' ? 600 : 400,
                        color: mode === 'manual' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        borderBottom: mode === 'manual' ? '2px solid var(--accent-color)' : 'none',
                        paddingBottom: '4px'
                    }}
                >
                    Вручну
                </button>
                <button
                    onClick={() => setMode('image')}
                    style={{
                        border: 'none',
                        background: 'none',
                        fontWeight: mode === 'image' ? 600 : 400,
                        color: mode === 'image' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        borderBottom: mode === 'image' ? '2px solid var(--accent-color)' : 'none',
                        paddingBottom: '4px'
                    }}
                >
                    З Зображення
                </button>
                <button
                    onClick={() => setMode('contrast')}
                    style={{
                        border: 'none',
                        background: 'none',
                        fontWeight: mode === 'contrast' ? 600 : 400,
                        color: mode === 'contrast' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        borderBottom: mode === 'contrast' ? '2px solid var(--accent-color)' : 'none',
                        paddingBottom: '4px'
                    }}
                >
                    Контраст
                </button>
                <button
                    onClick={() => setMode('preview')}
                    style={{
                        border: 'none',
                        background: 'none',
                        fontWeight: mode === 'preview' ? 600 : 400,
                        color: mode === 'preview' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        borderBottom: mode === 'preview' ? '2px solid var(--accent-color)' : 'none',
                        paddingBottom: '4px'
                    }}
                >
                    Перегляд
                </button>
            </div>

            {mode === 'manual' && (
                <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>Базовий Колір</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                style={{
                                    border: 'none',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent'
                                }}
                            />
                            <input
                                type="text"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: '8px',
                                    width: '100px',
                                    textTransform: 'uppercase'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>Правило Гармонії</label>
                        <select
                            value={harmony}
                            onChange={(e) => setHarmony(e.target.value as HarmonyType)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-color)',
                                minWidth: '200px'
                            }}
                        >
                            <option value="analogous">Аналогова</option>
                            <option value="complementary">Комплементарна</option>
                            <option value="split-complementary">Роздільно-комплементарна</option>
                            <option value="triadic">Тріада</option>
                            <option value="square">Квадрат</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <button
                            onClick={onClear}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 500,
                                height: '35px' // Align with input/select height roughly
                            }}
                        >
                            Очистити Палітру
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <button
                            onClick={() => setMode('preview')}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 500,
                                height: '35px'
                            }}
                        >
                            Попередній перегляд
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
