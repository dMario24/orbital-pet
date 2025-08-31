import React from 'react';

export const SponsorBanner = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 border-y-2 border-dashed border-yellow-500 py-4 px-6 my-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-yellow-400 mb-2">Sponsored By</h3>
        <div className="flex justify-center items-center gap-8">
        <a
            href="http://insightmining.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            인사이트마이닝
          </a>
          <a
            href="http://www.tadpolehub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            테드폴허브
          </a>
          <a
            href="https://harubook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            에스프레소북
          </a>
          <a
            href="https://vrerv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            VReRV
          </a>
           <p className="text-gray-300">
            <a
            href="https://bettercode.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-300 transition">
              베터코드
            </a>
            </p>
        </div>
      </div>
    </div>
  );
};
