import React from 'react';

const types = [
  { name: 'Apartments', count: '22 Properties', icon: '🏢' },
  { name: 'Independent House', count: '10 Properties', icon: '🏡' },
  { name: 'Villas', count: '15 Properties', icon: '🏘️' },
  { name: 'Builder Floor', count: '8 Properties', icon: '🏗️' },
  { name: 'Farm House', count: '5 Properties', icon: '🌾' },
];

export const PropertyTypes: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-primary-blue mb-10">We've got properties for everyone</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {types.map((type, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all cursor-pointer group bg-gray-50 hover:bg-white hover:border-primary-blue/30"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
              <h3 className="font-semibold text-gray-800 text-center">{type.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{type.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
