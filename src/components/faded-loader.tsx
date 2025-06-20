'use client';

import React from 'react';

export default function FadedLoader() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-xl">
      <div className="w-12 h-12 border-4 border-dotted border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
