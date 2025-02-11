'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
  title: string | React.ReactNode;
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
};

const CIMAccordion = ({ title, className, children, isOpen }: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAccordionOpen(isOpen);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div
      className={
        className
          ? className
          : 'w-full bg-[#141414] border border-line rounded-xl'
      }
    >
      {/* Button to toggle accordion */}
      <button
        onClick={toggleAccordion}
        className={`w-full flex justify-between items-center bg-[#262626] text-white px-4 py-2 transition-all duration-300 ${isAccordionOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        {title}
        <span className="text-md">{isAccordionOpen ? '< >' : '<>'}</span>
      </button>

      {/* Accordion Content Wrapper */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isAccordionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        {/* Accordion Content */}
        <div
          ref={contentRef}
          className="overflow-hidden bg-[#141414] rounded-b-2xl text-gray-300 text-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CIMAccordion;
