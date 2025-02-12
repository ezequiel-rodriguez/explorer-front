'use client';

import { useState } from 'react';

type props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  styles?: boolean;
  className?: string;
};
const Accordion = ({
  title,
  children,
  styles = true,
  className,
  subtitle,
}: props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleAccordion}
        className={`cursor-pointer ${styles ? 'justify-start bg-secondary transition p-4 rounded-xl outline-none' : ''} ${className} w-full text-left flex items-center gap-2`}
      >
        {isOpen ? (
          <span className="transition-transform transform rotate-180">-</span>
        ) : (
          <span className="transition-transform transform rotate-180">+</span>
        )}
        <span className="font-medium">{isOpen ? subtitle : title}</span>
      </button>
      <div
        className={`accordion-content transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className={`${styles ? 'px-5' : ''} mt-4`}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
