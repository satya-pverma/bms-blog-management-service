'use client';

import React from 'react';

export default function InlineLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-11 h-11 border-4 border-dotted border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
