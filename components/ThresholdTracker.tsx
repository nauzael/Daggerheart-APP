
import React from 'react';

interface ThresholdTrackerProps {
  label: string;
  current: number;
  max: number;
  onSet: (value: number) => void;
  color: string;
}

const ThresholdTracker: React.FC<ThresholdTrackerProps> = ({ label, current, max, onSet, color }) => {
    
    const handleClick = (index: number) => {
        // If clicking the last filled box, unfill it. Otherwise, fill up to the clicked box.
        const newValue = (index + 1 === current) ? index : index + 1;
        onSet(newValue);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-300">{label}</span>
                <span className="text-sm font-mono bg-slate-900 px-2 py-1 rounded">
                    {current} / {max}
                </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                {Array.from({ length: max }, (_, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(i)}
                        aria-label={`${label} point ${i + 1}`}
                        role="checkbox"
                        aria-checked={i < current}
                        className={`w-6 h-6 rounded-full cursor-pointer border-2 transition-colors ${
                            i < current
                                ? `${color} border-slate-400`
                                : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThresholdTracker;