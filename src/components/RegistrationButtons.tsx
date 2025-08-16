'use client'

import React from 'react';
import { event } from '@/lib/gtm';

export const RegistrationButtons = () => {
  const handleRegistrationClick = (type: 'attendee' | 'speaker') => {
    event({
      action: 'registration_click',
      category: 'conversion',
      label: type,
    });
  };

  return (
    <div className="flex justify-center gap-4 my-6">
      <a
        href="#"
        onClick={() => handleRegistrationClick('attendee')}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        참가자 신청
      </a>
      <a
        href="#"
        onClick={() => handleRegistrationClick('speaker')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        발표자 신청
      </a>
    </div>
  );
};
