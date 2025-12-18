import { Color } from '../core/Color';
import { AccessibilityValidator } from '../core/Contrast';
import { X, Check, AlertTriangle } from 'lucide-react';

interface ContrastCheckerProps {
    colors: Color[];
    onClose: () => void;
}

export function ContrastChecker({ colors, onClose }: ContrastCheckerProps) {
    const report = AccessibilityValidator.validatePalette(colors);

    // Calculate average ratio
    const avgRatio = report.length > 0
        ? report.reduce((acc, item) => acc + item.report.contrastRatio, 0) / report.length
        : 0;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-xl)',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>Contrast Check</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            WCAG 2.1 Compliance for all unique pairs
                        </p>
                    </div>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{
                    marginBottom: 'var(--spacing-lg)',
                    padding: 'var(--spacing-md)',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 500 }}>Average Contrast Score</span>
                    <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>
                        {avgRatio.toFixed(2)}:1
                    </span>
                </div>

                <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
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
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.pair[0].toHex(), border: '1px solid #ddd' }} />
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.pair[1].toHex(), border: '1px solid #ddd' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {item.pair[0].toHex()} vs {item.pair[1].toHex()}
                                    </span>
                                    <span style={{ fontWeight: 'bold' }}>{item.report.contrastRatio.toFixed(2)}:1</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                {item.report.isAccessible ? (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        backgroundColor: '#DCFCE7',
                                        color: '#166534',
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        <Check size={14} /> Pass {item.report.level}
                                    </span>
                                ) : (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        backgroundColor: '#FEE2E2',
                                        color: '#991B1B',
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}>
                                        <AlertTriangle size={14} /> Fail
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {report.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Not enough colors to check.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
