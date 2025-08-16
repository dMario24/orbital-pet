'use client'

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { event } from '@/lib/gtm';

export const ShareButtons = () => {
  const handleShare = (platform: 'facebook' | 'twitter') => {
    const url = window.location.href;
    let shareUrl = '';

    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      event({ action: 'share', category: 'social', label: 'facebook' });
    } else if (platform === 'twitter') {
      const text = document.title;
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      event({ action: 'share', category: 'social', label: 'twitter' });
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
      event({ action: 'copy_url', category: 'engagement', label: 'copy_button' });
    }, (err) => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy URL.');
    });
  };

  const handleHomeClick = () => {
    event({ action: 'navigate_home', category: 'navigation', label: 'cd_home' });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 border-t-2 border-dashed border-gray-700 pt-6">
      <Link href="/" onClick={handleHomeClick} className="text-cyan-400 hover:underline">
        &gt; cd ~
      </Link>
      <div className="flex items-center gap-4">
        <button onClick={() => handleShare('facebook')} className="text-white hover:text-blue-500 transition-colors">
          <FaFacebook size={28} />
        </button>
        <button onClick={() => handleShare('twitter')} className="text-white hover:text-cyan-400 transition-colors">
          <FaTwitter size={28} />
        </button>
        <button
          onClick={handleCopy}
          className="text-sm bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};
