import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
    onImageProcessed: (data: ImageData) => void;
}

export function ImageUpload({ onImageProcessed }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // Resize for performance
            const MAX_SIZE = 200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                onImageProcessed(imageData);
            }
        };
        img.src = url;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            className={`image-upload ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)',
                backgroundColor: isDragging ? '#fafafa' : 'transparent',
                borderColor: isDragging ? 'var(--accent-color)' : 'var(--border-color)',
                marginBottom: 'var(--spacing-lg)'
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: 'none' }}
                accept="image/*"
            />

            {preview ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            width: '100%',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'block'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        opacity: 0,
                        transition: '0.2s'
                    }} className="overlay">
                        Змінити Зображення
                    </div>
                </div>
            ) : (
                <div style={{ color: 'var(--text-secondary)' }}>
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <Upload size={32} strokeWidth={1.5} />
                    </div>
                    <p style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        Натисніть або перетягніть зображення сюди
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-xs)' }}>
                        Підтримуються JPG, PNG, WebP
                    </p>
                </div>
            )}
        </div>
    );
}
