import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const PersianJalaliDatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [jalaliDate, setJalaliDate] = useState({ year: 1403, month: 1, day: 1 });
  const pickerRef = useRef(null);

  // Persian month names
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  // Persian day names
  const persianDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  // Convert Gregorian to Jalali
  const gregorianToJalali = (gy, gm, gd) => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy, jm, jd, gy2, days;
    
    if (gy <= 1600) {
      jy = 0; gy -= 621;
    } else {
      jy = 979; gy -= 1600;
    }
    
    if (gm > 2) {
      gy2 = gy + 1;
    } else {
      gy2 = gy;
    }
    
    days = (365 * gy) + ((gy2 + 3) / 4) + ((gy2 + 99) / 100) + ((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    
    return { year: jy, month: jm, day: jd };
  };

  // Convert Jalali to Gregorian
  const jalaliToGregorian = (jy, jm, jd) => {
    let gy, gm, gd_result, sal_a, v;
    
    if (jy <= 979) {
      gy = 1600; jy += 621;
    } else {
      gy = 1979; jy -= 979;
    }
    
    if (jm < 7) {
      sal_a = jd + (jm - 1) * 31;
    } else {
      sal_a = jd + (jm - 7) * 30 + 186;
    }
    
    v = sal_a + Math.floor(jy / 33) * 12053;
    jy %= 33;
    
    v += Math.floor(jy / 4) * 1461 + (jy % 4) * 365;
    
    if (jy % 4 === 0 && sal_a > 79) {
      v++;
    }
    
    gy += Math.floor(v / 365.25);
    gd_result = v % 365.25;
    
    const leap = ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 1 : 0;
    const sal_b = leap ? [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335] : [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    gm = 0;
    while (gm < 13 && gd_result >= sal_b[gm]) gm++;
    
    if (gm > 1) {
      gd_result = gd_result - sal_b[gm - 1];
    }
    
    return { year: gy, month: gm, day: Math.floor(gd_result) };
  };

  // Check if Jalali year is leap
  const isJalaliLeapYear = (year) => {
    const breaks = [
      -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
      1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
    ];
    
    let jp = breaks[0];
    let jump = 0;
    for (let j = 1; j <= 19; j++) {
      const jm = breaks[j];
      jump = jm - jp;
      if (year < jm) break;
      jp = jm;
    }
    let n = year - jp;
    
    if (n < jump) {
      if (jump - n < 6) n = n - jump + ((jump + 4) / 6) * 6;
      let leap = ((n + 1) % 33) % 4;
      if (jump === 33 && leap === 1) leap = 0;
      return leap === 1;
    } else {
      return false;
    }
  };

  // Get days in Jalali month
  const getDaysInJalaliMonth = (year, month) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return isJalaliLeapYear(year) ? 30 : 29;
  };

  // Initialize current Jalali date
  useEffect(() => {
    const today = new Date();
    const jalaliToday = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
    setJalaliDate(jalaliToday);
    setCurrentYear(jalaliToday.year);
    setCurrentMonth(jalaliToday.month);
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInJalaliMonth(currentYear, currentMonth);
    const firstDayGregorian = jalaliToGregorian(currentYear, currentMonth, 1);
    const firstDay = new Date(firstDayGregorian.year, firstDayGregorian.month - 1, firstDayGregorian.day);
    const startDay = (firstDay.getDay() + 1) % 7; // Adjust for Saturday start

    const days = [];
    
    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    
    const selectedJalali = { year: currentYear, month: currentMonth, day };
    const gregorian = jalaliToGregorian(currentYear, currentMonth, day);
    
    setSelectedDate(new Date(gregorian.year, gregorian.month - 1, gregorian.day));
    setJalaliDate(selectedJalali);
    setIsOpen(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const formatPersianDate = (jalali) => {
    if (!jalali) return '';
    return `${jalali.day} ${persianMonths[jalali.month - 1]} ${jalali.year}`;
  };

  const days = generateCalendarDays();

  return (
    <div className="w-full mx-auto pt-2">
      
      <div className="relative" ref={pickerRef}>
        {/* Input Field */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-3  rounded-lg cursor-pointer hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
        >
          <span className="text-gray-700 font-medium text-right flex-1">
            {selectedDate ? formatPersianDate(jalaliDate) : 'تاریخ را انتخاب کنید'}
          </span>
          <Calendar className="w-5 h-5 text-gray-500 ml-2" />
        </div>

        {/* Calendar Dropdown */}
        {isOpen && (
          <div className="absolute left-0 right-0 -top-72 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="text-center">
                <div className="font-bold text-lg text-gray-800">
                  {persianMonths[currentMonth - 1]} {currentYear}
                </div>
              </div>
              
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {persianDays.map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day}
                    className={`
                      p-2 text-sm rounded hover:bg-blue-100 transition-colors
                      ${!day ? 'invisible' : 'visible'}
                      ${day && jalaliDate && day === jalaliDate.day && currentMonth === jalaliDate.month && currentYear === jalaliDate.year
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'text-gray-700'
                      }
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default PersianJalaliDatePicker;