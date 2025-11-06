import React from 'react';
import { Domain, DOMAINS } from '../data/domains';
import { Class } from '../data/classes';

interface DomainSelectorProps {
  selectedClass: Class;
}

const DomainDisplayCard: React.FC<{domain: Domain}> = ({ domain }) => (
    <div className="p-3 border rounded-lg bg-slate-700 border-slate-600 flex flex-col items-center gap-2 text-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={domain.icon} />
        </svg>
        <h4 className="font-bold text-base">{domain.name}</h4>
        <p className="text-xs text-slate-400 flex-grow">{domain.description}</p>
    </div>
);


const DomainSelector: React.FC<DomainSelectorProps> = ({ selectedClass }) => {
  const classDomains = DOMAINS.filter(d => selectedClass.domains.includes(d.name));

  return (
    <div className="flex flex-col gap-4">
        <h3 className="text-slate-300 font-semibold">{selectedClass.name} Domains</h3>
        <div className="grid grid-cols-2 gap-3">
            {classDomains.map(domain => (
                <DomainDisplayCard 
                    key={domain.name}
                    domain={domain}
                />
            ))}
        </div>
    </div>
  );
};

export default DomainSelector;