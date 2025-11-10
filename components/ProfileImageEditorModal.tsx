import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ProfileImageEditorModalProps {
    currentImage?: string;
    onClose: () => void;
    onSave: (imageData: string) => void;
}

const EDITOR_SIZE = 300;
const OUTPUT_SIZE = 256;

const ProfileImageEditorModal: React.FC<ProfileImageEditorModalProps> = ({ currentImage, onClose, onSave }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [minScale, setMinScale] = useState(1);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(new Image());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0 });
    
    imageRef.current.crossOrigin = "anonymous"; // Handle CORS for initial images

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image.src) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#1e293b'; // bg-slate-800
        ctx.fillRect(0, 0, EDITOR_SIZE, EDITOR_SIZE);

        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;

        ctx.drawImage(image, offset.x, offset.y, scaledWidth, scaledHeight);
        
        // Draw circular overlay
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.rect(0, 0, EDITOR_SIZE, EDITOR_SIZE);
        ctx.arc(EDITOR_SIZE / 2, EDITOR_SIZE / 2, EDITOR_SIZE / 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();

    }, [scale, offset]);

    const loadImage = (src: string) => {
        const image = imageRef.current;
        image.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const hRatio = canvas.width / image.width;
            const vRatio = canvas.height / image.height;
            const initialScale = Math.max(hRatio, vRatio);

            setMinScale(initialScale);
            setScale(initialScale);

            const initialX = (canvas.width - image.width * initialScale) / 2;
            const initialY = (canvas.height - image.height * initialScale) / 2;
            setOffset({ x: initialX, y: initialY });
        };
        image.onerror = () => {
          alert('Failed to load image. It might be a CORS issue. Please try a different image or host.');
          setImageSrc(null);
        }
        image.src = src;
        setImageSrc(src);
    }
    
    useEffect(() => {
        if (currentImage) {
            loadImage(currentImage);
        }
    }, [currentImage]);
    
    useEffect(() => {
        draw();
    }, [draw]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target?.result) {
                    loadImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = ''; // Allow re-uploading the same file
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        isDraggingRef.current = true;
        dragStartRef.current = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDraggingRef.current) return;
        const x = e.clientX - dragStartRef.current.x;
        const y = e.clientY - dragStartRef.current.y;
        setOffset({ x, y });
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image.src) return;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = OUTPUT_SIZE;
        tempCanvas.height = OUTPUT_SIZE;
        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return;

        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2, true);
        ctx.clip();

        // Calculate source coordinates from original image
        const sourceX = -offset.x / scale;
        const sourceY = -offset.y / scale;
        const sourceSize = EDITOR_SIZE / scale;

        ctx.drawImage(
            image,
            sourceX,
            sourceY,
            sourceSize,
            sourceSize,
            0,
            0,
            OUTPUT_SIZE,
            OUTPUT_SIZE
        );
        
        onSave(tempCanvas.toDataURL('image/jpeg', 0.9));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
            <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className="bg-slate-900 rounded-lg shadow-xl p-4 sm:p-6 border border-slate-700 w-full max-w-md flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-teal-400">Edit Profile Image</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <canvas
                        ref={canvasRef}
                        width={EDITOR_SIZE}
                        height={EDITOR_SIZE}
                        className="rounded-full cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />
                    
                    {!imageSrc && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-400">
                            <p>No image selected.</p>
                            <p>Click "Upload" to begin.</p>
                        </div>
                    )}
                    
                    <div className="w-full flex items-center gap-2">
                        <span className="text-slate-400">Zoom:</span>
                        <input
                            type="range"
                            min={minScale}
                            max={minScale + 2}
                            step="0.01"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                            disabled={!imageSrc}
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-4 pt-6 mt-4 border-t border-slate-700">
                    <button onClick={() => fileInputRef.current?.click()} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg">
                        Upload
                    </button>
                    <button onClick={handleSave} disabled={!imageSrc} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileImageEditorModal;