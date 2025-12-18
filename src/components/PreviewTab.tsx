import { useState } from 'react';
import type { Palette } from '../core/PaletteController';
import { DashboardMockup } from './mockups/DashboardMockup';
import { LandingPageMockup } from './mockups/LandingPageMockup';
import { Layout, Globe } from 'lucide-react';

interface PreviewTabProps {
    palette: Palette;
}

export function PreviewTab({ palette }: PreviewTabProps) {
    const [view, setView] = useState<'dashboard' | 'landing'>('dashboard');

    if (palette.colors.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-secondary)',
                backgroundColor: '#f9f9f9',
                borderRadius: 'var(--radius-lg)'
            }}>
                <Layout size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <h3>Немає палітри для перегляду</h3>
                <p>Згенеруйте або видобуть палітру, щоб побачити попередній перегляд.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                    onClick={() => setView('dashboard')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: view === 'dashboard' ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                        backgroundColor: view === 'dashboard' ? 'rgba(0,0,0,0.03)' : 'white',
                        color: view === 'dashboard' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Layout size={18} /> Дашборд
                </button>
                <button
                    onClick={() => setView('landing')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: view === 'landing' ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                        backgroundColor: view === 'landing' ? 'rgba(0,0,0,0.03)' : 'white',
                        color: view === 'landing' ? 'var(--accent-color)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Globe size={18} /> Лендінг
                </button>
            </div>

            {view === 'dashboard' ? (
                <DashboardMockup colors={palette.colors} />
            ) : (
                <LandingPageMockup colors={palette.colors} />
            )}

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                * Кольори автоматично адаптуються під ролі інтерфейсу
            </p>
        </div>
    );
}
