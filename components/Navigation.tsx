'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [progress, setProgress] = useState(75);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="text-blue-400">Code</span>Learn
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/tutorials" className="text-gray-300 hover:text-blue-400 transition-colors">
                Tutorials
              </Link>
              <Link href="/playground" className="text-gray-300 hover:text-blue-400 transition-colors">
                Playground
              </Link>
              <Link href="/quiz" className="text-gray-300 hover:text-blue-400 transition-colors">
                Quiz
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">Progress</div>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div 
                className="progress-bar h-full rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
