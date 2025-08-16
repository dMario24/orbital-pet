import React from 'react';

export const SponsorBanner = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 border-y-2 border-dashed border-yellow-500 py-4 px-6 my-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">Sponsored By</h3>
        <div className="flex justify-center items-center gap-8">
          <p className="text-gray-300">Placeholder Sponsor 1</p>
          <p className="text-gray-300">Placeholder Sponsor 2</p>
          <p className="text-gray-300">Placeholder Sponsor 3</p>
        </div>
      </div>
    </div>
  );
};
