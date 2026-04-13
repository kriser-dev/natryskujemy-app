import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    id: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({question, answer, id}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 py-6 group">
            <div
                className="flex justify-between items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                <h4 className="text-lg font-bold text-slate-800 group-hover:text-brand-primary transition-colors pr-8">{question}</h4>
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isOpen ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-primary/20 group-hover:text-brand-primary'}`}>
                    <ChevronDown size={18}
                                 className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                </div>
            </div>
            <div
                id={`faq-answer-${id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-slate-600 leading-relaxed text-sm pr-10">{answer}</p>
            </div>
        </div>
    );
};