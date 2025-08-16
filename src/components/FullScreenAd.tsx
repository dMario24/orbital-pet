'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export const FullScreenAd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  const handleClose = useCallback(() => {
    if (dontShowToday) {
      const now = new Date().getTime();
      localStorage.setItem('adLastClosed', now.toString());
    }
    setIsOpen(false);
  }, [dontShowToday]);

  useEffect(() => {
    const lastClosed = localStorage.getItem('adLastClosed');
    const now = new Date().getTime();

    if (lastClosed && (now - parseInt(lastClosed, 10) < 24 * 60 * 60 * 1000)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg shadow-lg text-center w-full max-w-xs md:max-w-2xl relative">
        <div className="p-4 md:p-8">
          <Image
            src="/lab-logo-300.webp"
            alt="NOANcon 2025"
            width={300}
            height={300}
            className="mx-auto"
            unoptimized
          />
        </div>
        <div className="bg-gray-900 bg-opacity-75 p-4 rounded-b-lg">
          <div className="flex items-center justify-center mb-4">
            <input
              type="checkbox"
              id="dontShowToday"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-600"
            />
            <label htmlFor="dontShowToday" className="ml-2 text-sm text-gray-300">
              Don&apos;t show again today
            </label>
          </div>
          <button
            onClick={handleClose}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
