
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
            <div className="flex items-center gap-2">
                {isEditable && onUpdate && (
                    <button 
                        onClick={() => onUpdate(-1)} 
                        className="bg-slate-600 hover:bg-slate-500 text-white font-bold h-6 w-6 rounded-full flex items-center justify-center text-lg transition duration-200"
                    >
                        -
                    </button>
                )}
                <span className="text-xl font-bold text-teal-300 w-8 text-center">{value}</span>
                {isEditable && onUpdate && (
                    <button 
                        onClick={() => onUpdate(1)} 
                        className="bg-slate-600 hover:bg-slate-500 text-white font-bold h-6 w-6 rounded-full flex items-center justify-center text-lg transition duration-200"
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatDisplay;
