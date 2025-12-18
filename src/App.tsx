import { useState, useEffect, useMemo } from 'react';
import { PaletteController, type Palette } from './core/PaletteController';
import { Color } from './core/Color';
import type { HarmonyType } from './core/Harmonies';
import { PaletteDisplay } from './components/PaletteDisplay';
import { Controls } from './components/Controls';
import { ImageUpload } from './components/ImageUpload';
import { ExportControls } from './components/ExportControls';
import { ContrastTab } from './components/ContrastTab';
import { PreviewTab } from './components/PreviewTab';
import { Wand2 } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<'manual' | 'image' | 'contrast' | 'preview'>('manual');
  const [previewSource, setPreviewSource] = useState<'manual' | 'image'>('manual');

  // Contrast Persistence State
  const [contrastText, setContrastText] = useState('');
  const [contrastColors, setContrastColors] = useState<Color[]>([]);

  // Manual State
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [harmony, setHarmony] = useState<HarmonyType>('complementary');
  const [manualPalette, setManualPalette] = useState<Palette>({ colors: [] });

  // Image State
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [imagePalette, setImagePalette] = useState<Palette>({ colors: [] });
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractCount, setExtractCount] = useState(5);



  const controller = useMemo(() => new PaletteController(), []);

  // Effect for Manual Palette updates (reactive)
  useEffect(() => {
    try {
      const newPalette = controller.handleGenerationRequest({
        type: 'harmony',
        baseColor,
        harmonyType: harmony
      });
      setManualPalette(newPalette);
    } catch (e) {
      console.error(e);
    }
  }, [baseColor, harmony, controller]);

  // Handler for Image Extraction (explicit)
  const handleExtractColors = async () => {
    console.log("Extract button clicked");
    if (!imageData) {
      console.log("No image data");
      return;
    }

    setIsExtracting(true);
    // Add a small delay to allow UI to show loading state if needed 
    // (though JS is single threaded, this helps if we used workers, but here it just queues)
    setTimeout(() => {
      try {
        console.log("Calling controller...");
        const newPalette = controller.handleGenerationRequest({
          type: 'image',
          imageData,
          colorCount: extractCount
        });
        console.log("New palette:", newPalette);
        setImagePalette(newPalette);
      } catch (e) {
        console.error(e);
      } finally {
        setIsExtracting(false);
      }
    }, 50);
  };

  const currentPalette = (mode === 'manual' || (mode === 'preview' && previewSource === 'manual'))
    ? manualPalette
    : imagePalette;

  return (
    <div style={{ minHeight: '100vh', padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
        <div style={{ padding: '8px', borderRadius: '8px' }}>
          <img src="/src/assets/logo.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', letterSpacing: '-0.02em' }}>
          Генератор Палітр
        </h1>
      </header>

      <main>
        <Controls
          baseColor={baseColor}
          setBaseColor={setBaseColor}
          harmony={harmony}
          setHarmony={setHarmony}
          mode={mode}
          setMode={(m) => {
            setMode(m);
            if (m === 'manual') setPreviewSource('manual');
            if (m === 'image') setPreviewSource('image');
          }}
          onClear={() => setManualPalette({ colors: [] })}
        />

        {mode === 'image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <ImageUpload onImageProcessed={(data) => {
              setImageData(data);
            }} />

            {imageData && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>

                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Кількість кольорів: {extractCount}</label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={extractCount}
                      onChange={(e) => setExtractCount(Number(e.target.value))}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <button
                    onClick={() => {
                      setImageData(null);
                      setImagePalette({ colors: [] });
                      setExtractCount(5);
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'white',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 500
                    }}
                  >
                    Очистити
                  </button>
                  <button
                    onClick={handleExtractColors}
                    disabled={isExtracting}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 500,
                      opacity: isExtracting ? 0.7 : 1,
                      cursor: isExtracting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Wand2 size={18} />
                    {isExtracting ? 'Видобування...' : 'Видобути Кольори'}
                  </button>
                  <button
                    onClick={() => {
                      setPreviewSource('image');
                      setMode('preview');
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'transparent',
                      color: 'var(--accent-color)',
                      border: '1px solid var(--accent-color)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 500
                    }}
                  >
                    Переглянути
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'contrast' && (
          <ContrastTab
            inputText={contrastText}
            setInputText={setContrastText}
            colors={contrastColors}
            setColors={setContrastColors}
          />
        )}
        {mode === 'preview' ? (
          <PreviewTab palette={currentPalette} />
        ) : (
          <>
            <PaletteDisplay palette={currentPalette} />

            {currentPalette.colors.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', marginTop: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                <ExportControls palette={currentPalette} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
