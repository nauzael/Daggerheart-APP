
import React from 'react';

interface ThresholdTrackerProps {
  label: string;
  current: number;
  max: number;
  onSet: (value: number) => void;
  onReset?: () => void;
  color: string;
}

const ThresholdTracker: React.FC<ThresholdTrackerProps> = ({ label, current, max, onSet, onReset, color }) => {
    
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
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-colors ${
                            i < current
                                ? `${color} border-slate-400`
                                : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                        }`}
                    />
                ))}
                {onReset && (
                    <button onClick={onReset} title={`Reset ${label}`} className="text-slate-400 hover:text-white transition-colors ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991l-3.182-3.182a8.25 8.25 0 00-11.664 0l-3.182 3.182" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ThresholdTracker;