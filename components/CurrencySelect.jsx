import React, { useState, useEffect, useRef } from 'react';

const CurrencySelect = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div ref={selectRef} className="relative inline-block w-full h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full bg-transparent text-center text-white font-extrabold text-2xl flex items-center justify-center p-2"
      >
        {selectedOption && (
          <>
            <img
              src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/${selectedOption.isoCode.toLowerCase()}.svg`}
              alt={`${selectedOption.isoCode} flag`}
              className="inline-block h-6 w-6 mr-2"
            />
            <span>{`${selectedOption.isoCode} ${selectedOption.currency}`}</span>
          </>
        )}
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 bg-white border rounded-lg w-full max-h-[500px] overflow-y-scroll"
          style={{ maxHeight: '500px' }}
        >
          {options.map((option) => (
            <li
              key={`${option.id}`}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
            >
              <img
                src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/${option.isoCode.toLowerCase()}.svg`}
                alt={`${option.isoCode} flag`}
                className="inline-block h-6 w-6 mr-2"
              />
              <span>{`${option.isoCode} ${option.currency}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelect;
