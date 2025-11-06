import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className, headerContent }) => {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4 border-b-2 border-slate-600 pb-2">
        <h2 className="text-2xl font-bold text-teal-400">
          {title}
        </h2>
        {headerContent}
      </div>
      {children}
    </div>
  );
};

export default Card;