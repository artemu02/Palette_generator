import type { Color } from '../../core/Color';
import { LayoutDashboard, Users, Settings, TrendingUp, Bell, Search } from 'lucide-react';

interface MockupProps {
    colors: Color[];
}

export function DashboardMockup({ colors }: MockupProps) {
    // Fallback colors if palette is too small
    const getHex = (i: number) => colors[i % colors.length]?.toHex() || '#cccccc';

    // Assign roles loosely based on index
    const primary = getHex(0);
    const secondary = getHex(1);
    const surface = getHex(2); // Often light in many palettes
    const text = '#1f2937';
    const background = '#f3f4f6';

    // Helper to determine if a color is dark
    const isDark = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 < 128;
    };

    const primaryIsDark = isDark(primary);

    return (
        <div style={{
            display: 'flex',
            height: '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '60px', // Collapsed sidebar for minimal look
                backgroundColor: primary,
                color: primaryIsDark ? 'white' : 'black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 0',
                gap: '24px'
            }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0.8 }}>
                    <LayoutDashboard size={20} />
                    <Users size={20} />
                    <TrendingUp size={20} />
                </div>
                <Settings size={20} style={{ opacity: 0.8 }} />
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, backgroundColor: background, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{
                    height: '60px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px'
                }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: text }}>Панель Керування</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6b7280' }}>
                        <Search size={18} />
                        <Bell size={18} />
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: secondary }} />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div style={{ padding: '24px', overflowY: 'auto' }}>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {[
                            { label: 'Користувачі', val: '1,234', trend: '+12%', color: primary },
                            { label: 'Дохід', val: '$42,500', trend: '+8%', color: secondary },
                            { label: 'Замовлення', val: '856', trend: '-2%', color: getHex(3) }
                        ].map((stat, i) => (
                            <div key={i} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '8px' }}>{stat.label}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: text }}>{stat.val}</div>
                                    <div style={{ fontSize: '0.8rem', color: stat.color, fontWeight: 500 }}>{stat.trend}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', height: '200px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                        <div style={{ marginBottom: '16px', fontWeight: 600, color: text }}>Аналітика</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '120px', gap: '12px' }}>
                            {[40, 65, 35, 80, 50, 90, 60, 75].map((h, i) => (
                                <div key={i} style={{
                                    flex: 1,
                                    backgroundColor: i % 2 === 0 ? primary : surface,
                                    height: `${h}%`,
                                    borderRadius: '4px',
                                    opacity: 0.8
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
