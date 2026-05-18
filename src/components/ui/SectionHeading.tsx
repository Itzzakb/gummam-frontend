import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
        {title}
        <span className={`absolute -bottom-2 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-12 h-1 bg-primary-blue rounded-full`}></span>
      </h2>
      {subtitle && <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};
