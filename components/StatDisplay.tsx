
import React from 'react';

interface StatDisplayProps {
    label: string;
    value: number;
    isEditable?: boolean;
    onUpdate?: (change: number) => void;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, isEditable = false, onUpdate }) => {
    return (
        <div className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
            <span className="text-md font-semibold capitalize text-slate-300">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-teal-300 min-w-[2rem] text-center">{value}</span>
                {isEditable && onUpdate ? (
                    <div className="flex flex-col">
                        <button 
                            onClick={() => onUpdate(1)} 
                            className="bg-slate-600 hover:bg-slate-500 text-white font-bold h-5 w-5 rounded-sm flex items-center justify-center text-lg transition duration-200"
                            aria-label={`Increase ${label}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => onUpdate(-1)} 
                            className="bg-slate-600 hover:bg-slate-500 text-white font-bold h-5 w-5 rounded-sm flex items-center justify-center text-lg transition duration-200 mt-1"
                            aria-label={`Decrease ${label}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="w-5" /> // Placeholder for alignment
                )}
            </div>
        </div>
    );
};

export default StatDisplay;
