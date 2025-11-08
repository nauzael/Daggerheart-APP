import React from 'react';

interface ThresholdTrackerProps {
  label: string;
  current: number;
  max: number;
  onSet: (value: number) => void;
  onReset?: () => void;
  color: string;
  showAsMarked?: boolean;
  size?: 'normal' | 'small';
}

const ThresholdTracker: React.FC<ThresholdTrackerProps> = ({ label, current, max, onSet, onReset, color, showAsMarked = false, size = 'normal' }) => {
    
    const handleClick = (index: number) => {
        if (showAsMarked) {
            const currentlyMarked = max - current;
            // If clicking the last marked pip, unmark it. Otherwise, mark up to the clicked pip.
            const newMarkedValue = (index + 1 === currentlyMarked) ? index : index + 1;
            onSet(max - newMarkedValue);
        } else {
            // If clicking the last filled box, unfill it. Otherwise, fill up to the clicked box.
            const newValue = (index + 1 === current) ? index : index + 1;
            onSet(newValue);
        }
    };

    const displayValue = showAsMarked ? max - current : current;
    const circleSize = size === 'normal' ? 'w-8 h-8' : 'w-6 h-6';
    const gap = size === 'normal' ? 'gap-2' : 'gap-1.5';

    if (size === 'small') {
        return (
            <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-300 flex-shrink-0 text-sm">{label}: {displayValue}/{max}</span>
                <div className={`flex items-center flex-wrap ${gap}`}>
                    {Array.from({ length: max }, (_, i) => {
                        const isFilled = showAsMarked ? i < (max - current) : i < current;
                        return (
                            <div
                                key={i}
                                onClick={() => handleClick(i)}
                                aria-label={`${label} point ${i + 1}`}
                                role="checkbox"
                                aria-checked={isFilled}
                                className={`${circleSize} rounded-full cursor-pointer border-2 transition-colors ${
                                    isFilled
                                        ? `${color} border-slate-400`
                                        : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                                }`}
                            />
                        );
                    })}
                </div>
                {onReset && (
                    <button onClick={onReset} title={`Reset ${label}`} className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-3.181-4.991l-3.182-3.182a8.25 8.25 0 00-11.664 0l-3.182 3.182" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-300">{label}</span>
                <span className="text-sm font-mono bg-slate-900 px-2 py-1 rounded">
                    {displayValue} / {max}
                </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                {Array.from({ length: max }, (_, i) => {
                    const isFilled = showAsMarked ? i < (max - current) : i < current;
                    return (
                        <div
                            key={i}
                            onClick={() => handleClick(i)}
                            aria-label={`${label} point ${i + 1}`}
                            role="checkbox"
                            aria-checked={isFilled}
                            className={`${circleSize} rounded-full cursor-pointer border-2 transition-colors ${
                                isFilled
                                    ? `${color} border-slate-400`
                                    : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                            }`}
                        />
                    );
                })}
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