import type { Color } from '../../core/Color';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

interface MockupProps {
    colors: Color[];
}

export function LandingPageMockup({ colors }: MockupProps) {
    const getHex = (i: number) => colors[i % colors.length]?.toHex() || '#cccccc';

    const brand = getHex(0);
    const accent = getHex(1);
    const dark = '#111827';
    const light = '#f9fafb';

    return (
        <div style={{
            height: '500px',
            borderRadius: '12px',
            overflow: 'auto',
            border: '1px solid #e5e7eb',
            fontFamily: 'Inter, sans-serif',
            backgroundColor: 'white',
            position: 'relative'
        }}>
            {/* Nav */}
            <div style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: brand }}>Brand</div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#4b5563' }}>
                    <span>Продукт</span>
                    <span>Ціни</span>
                    <span>Про нас</span>
                </div>
            </div>

            {/* Hero */}
            {/* Hero */}
            <div style={{
                padding: '40px 32px 60px',
                backgroundColor: light,
                background: `linear-gradient(180deg, ${light} 0%, white 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px'
            }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: dark,
                        lineHeight: 1.2,
                        marginBottom: '20px'
                    }}>
                        Створіть свій<br />
                        <span style={{ color: brand }}>Ідеальний Дизайн</span>
                    </h1>
                    <p style={{ color: '#6b7280', maxWidth: '400px', marginBottom: '30px' }}>
                        Швидко, просто та ефективно. Використовуйте нашу платформу для найкращих результатів.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '10px 24px',
                            backgroundColor: brand,
                            color: 'white',
                            border: 'none',
                            borderRadius: '99px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            Почати <ArrowRight size={16} />
                        </button>
                        <button style={{
                            padding: '10px 24px',
                            backgroundColor: 'white',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '99px',
                            fontWeight: 600
                        }}>
                            Детальніше
                        </button>
                    </div>
                </div>

                {/* Minimalistic Palette Imitation Stack */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', position: 'relative' }}>
                    {/* Back Card (Duplicate) */}
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        padding: '30px',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                        width: '300px',
                        transform: 'rotate(6deg) scale(0.95)',
                        opacity: 0.4,
                        zIndex: 1
                    }}>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Палітра Проєкту</div>
                        {colors.slice(0, 5).map((_, i) => (
                            <div key={i} style={{
                                height: '50px',
                                borderRadius: '12px',
                                backgroundColor: getHex(i),
                                opacity: 0.5
                            }} />
                        ))}
                    </div>

                    {/* Front Card */}
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        padding: '30px',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                        width: '300px',
                        transform: 'rotate(-4deg)',
                        zIndex: 2
                    }}>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Палітра Проєкту</div>
                        {colors.slice(0, 5).map((_, i) => (
                            <div key={i} style={{
                                height: '50px',
                                borderRadius: '12px',
                                backgroundColor: getHex(i),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 16px',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: 'white',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                                <span style={{ fontFamily: 'monospace', opacity: 0.9, mixBlendMode: 'difference' }}>{getHex(i).toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div style={{ padding: '40px 32px', backgroundColor: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                    {[
                        { icon: Zap, title: 'Швидкість', text: 'Миттєвий результат.' },
                        { icon: Shield, title: 'Надійність', text: 'Захист даних.' },
                        { icon: Star, title: 'Якість', text: 'Високі стандарти.' },
                        { icon: ArrowRight, title: 'Прогрес', text: 'Постійний розвиток.' }
                    ].map((f, i) => (
                        <div key={i} style={{
                            padding: '16px',
                            borderRadius: '12px',
                            backgroundColor: i === 1 ? 'white' : '#f9fafb',
                            border: i === 1 ? `2px solid ${accent}` : '1px solid transparent',
                            textAlign: 'left',
                            boxShadow: i === 1 ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                backgroundColor: getHex(i),
                                color: 'white', // Basic white icon, might need contrast check ideally but kept simple for mockup
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px'
                            }}>
                                <f.icon size={18} />
                            </div>
                            <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '6px', color: dark }}>{f.title}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.4 }}>{f.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
