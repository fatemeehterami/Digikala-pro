
import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options = [], 
  placeholder = "", 
  onSelect = () => {},
  multiple = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(multiple ? [] : null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && multiple && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, multiple]);

  const handleOptionClick = (option) => {
    if (multiple) {
      const isSelected = selectedOptions.some(selected => selected.value === option.value);
      let newSelection;
      
      if (isSelected) {
        newSelection = selectedOptions.filter(selected => selected.value !== option.value);
      } else {
        newSelection = [...selectedOptions, option];
      }
      
      setSelectedOptions(newSelection);
      onSelect(newSelection);
    } else {
      setSelectedOptions(option);
      setIsOpen(false);
      onSelect(option);
    }
  };

  const isOptionSelected = (option) => {
    if (multiple) {
      return selectedOptions.some(selected => selected.value === option.value);
    }
    return selectedOptions?.value === option.value;
  };

  const getDisplayText = () => {
    if (multiple) {
      if (selectedOptions.length === 0) return  ' انتخاب ' +placeholder ;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions.length} items selected`;
    }
    return selectedOptions ? selectedOptions.label :  ' انتخاب ' +placeholder ;;
  };

  const removeSelectedOption = (optionToRemove, event) => {
    event.stopPropagation();
    const newSelection = selectedOptions.filter(
      option => option.value !== optionToRemove.value
    );
    setSelectedOptions(newSelection);
    onSelect(newSelection);
  };

  return (
    <div className="relative w-full mt-3" ref={dropdownRef}>
        <p className="text-sm flex justify-between items-center
         px-5 font-medium text-gray-700 mb-4">
           {placeholder}
           <svg className='w-2.5 h-2.5 text-black'>
            <use href="#down-arrowKey"></use>
            </svg>
        </p>
      {/* Dropdown Button */}
      <button
        type="button" 
        className="w-full text-right px-4 py-3  bg-white  rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {multiple && selectedOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.slice(0, 3).map((option) => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                  >
                    {option.label}
                    <button
                      onClick={(e) => removeSelectedOption(option, e)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedOptions.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                    +{selectedOptions.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span className={selectedOptions && !multiple ? 'text-gray-900' : 'text-gray-500'}>
                {getDisplayText()}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input - only show for multiple selection */}
          {multiple && (
            <div className="p-3 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`جستجو ${placeholder}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="w-full  px-4 py-3 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-gray-900"
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="flex items-center flex-row-reverse justify-between w-full gap-3">
                    {multiple && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isOptionSelected(option)}
                          onChange={() => {}} // Handled by button click
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                    )}
                    <span className="">{option.label}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;