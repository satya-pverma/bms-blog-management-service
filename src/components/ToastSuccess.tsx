'use client';

import { useEffect, useState } from 'react';

type Props = {
  message: string;
  duration?: number; // Optional: auto-hide duration in ms
  color: string
};

export default function ToastSuccess({ message, color, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className={`bg-${color}-500 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in-right`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
