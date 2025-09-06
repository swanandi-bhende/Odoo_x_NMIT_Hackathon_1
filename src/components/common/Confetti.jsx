import React from 'react'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'
import { useSettings } from '../../context/SettingsContext';

const Confetti = () => {
  const [width, height] = useWindowSize()
  const { settings } = useSettings();
  
  // Respects reduced motion preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={false}
      colors={[
        '#22c55e', // green-500
        '#16a34a', // green-600
        '#facc15', // yellow-400
        '#ffffff'
      ]}
      className="!fixed z-50"
    />
  )
}

export default Confetti;