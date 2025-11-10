import React, { useState, useEffect } from 'react';

interface SelectionModalProps<T extends { name: string }> {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selection: string) => void;
    title: string;
    items: T[];
    renderItemDetails: (item: T) => React.ReactNode;
    initialSelection?: string;
}

const SelectionModal = <T extends { name: string }>({
    isOpen,
    onClose,
    onConfirm,
    title,
    items,
    renderItemDetails,
    initialSelection = ''
}: SelectionModalProps<T>) => {
    const [selectedItemName, setSelectedItemName] = useState(initialSelection);
    const [isShowingDetailsOnMobile, setIsShowingDetailsOnMobile] = useState(false);
    
    useEffect(() => {
        setSelectedItemName(initialSelection);
        setIsShowingDetailsOnMobile(false); // Reset mobile view on open
    }, [initialSelection, isOpen]);

    const selectedItem = items.find(item => item.name === selectedItemName);

    const handleConfirmClick = () => {
        if (selectedItemName) {
            onConfirm(selectedItemName);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0 pb-4 border-b border-slate-600">
                    <h2 className="text-2xl font-bold text-teal-400">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-6 overflow-hidden flex-grow">
                    {/* List Column - Conditional visibility on mobile */}
                    <div className={`md:col-span-3 overflow-y-auto pr-2 space-y-2 ${isShowingDetailsOnMobile ? 'hidden md:block' : 'block'}`}>
                        {items.map(item => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setSelectedItemName(item.name);
                                    setIsShowingDetailsOnMobile(true);
                                }}
                                className={`w-full text-left p-3 rounded-md transition-colors text-slate-200 ${
                                    selectedItemName === item.name
                                        ? 'bg-teal-600 font-semibold'
                                        : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Details Column - Conditional visibility on mobile */}
                    <div className={`md:col-span-7 bg-slate-900/50 p-4 rounded-lg overflow-y-auto ${isShowingDetailsOnMobile ? 'block' : 'hidden md:block'}`}>
                        <button 
                            onClick={() => setIsShowingDetailsOnMobile(false)}
                            className="md:hidden mb-4 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg w-full"
                        >
                            &larr; Back to List
                        </button>
                        {selectedItem ? (
                            renderItemDetails(selectedItem)
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-slate-400">Select an option from the list to see details.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-6 flex-shrink-0 mt-auto">
                    <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmClick}
                        disabled={!selectedItemName}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Confirm Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectionModal;