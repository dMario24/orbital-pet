"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaFacebook } from 'react-icons/fa'

const SHARE_TEXT = "I'm testing out Orbital Pet! Come join me in the lab. #OrbitalPet";

export default function LabPage() {
  const [labUrl, setLabUrl] = useState('');
  const [energy, setEnergy] = useState(50);
  const [signal, setSignal] = useState(50);

  // Decrease stats over time and set dynamic URL
  useEffect(() => {
    setLabUrl(window.location.href);

    const interval = setInterval(() => {
      setEnergy(prev => Math.max(0, prev - 2));
      setSignal(prev => Math.max(0, prev - 3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRecharge = () => setEnergy(prev => Math.min(100, prev + 20));
  const handleComms = () => setSignal(prev => Math.min(100, prev + 25));
  const handleReset = () => {
    setEnergy(50);
    setSignal(50);
  };

  return (
    <div className="font-mono bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          Orbital Pet Lab
        </h1>
        <p className="text-gray-400 mb-6">
          Welcome to the experimental lab. The features here are for testing and may not be final.
        </p>

        <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6 shadow-[0_0_20px_rgba(255,255,0,0.3)]">
          <div className="flex justify-center mb-4">
            <Image
              src="/lab-logo.webp"
              alt="Satellite Pet"
              width={150}
              height={150}
              className="animate-pulse"
              unoptimized={true}
            />
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">PET PROTOTYPE: LAB-01</h2>

          <div className="text-left space-y-4 text-lg">
            <div>
              <p>ORBITAL ENERGY:</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${energy}%` }}></div>
              </div>
            </div>
            <div>
              <p>SIGNAL STRENGTH:</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-cyan-500 h-4 rounded-full transition-all duration-500" style={{ width: `${signal}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={handleRecharge} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              RECHARGE ENERGY
            </button>
            <button onClick={handleComms} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              ESTABLISH COMMS
            </button>
            <button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              RESET SIMULATION
            </button>
          </div>
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-bold text-green-400 mb-3">Share the Experiment!</h3>
            <div className="flex justify-center gap-4">
                <a href={`https://twitter.com/intent/tweet?url=${labUrl}&text=${encodeURIComponent(SHARE_TEXT)}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
                    <FaTwitter size={32} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${labUrl}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors">
                    <FaFacebook size={32} />
                </a>
            </div>
        </div>

        <div className="mt-8">
            <Link href="/" className="text-cyan-400 hover:underline">
                &gt; Back to Home
            </Link>
        </div>
      </div>
    </div>
  )
}
