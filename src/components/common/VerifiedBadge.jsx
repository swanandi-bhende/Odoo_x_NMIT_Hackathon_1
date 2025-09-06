import React from 'react';
import { ShieldCheck } from 'lucide-react';

const VerifiedBadge = ({ showText = true }) => {
  return (
    <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
      <ShieldCheck size={14} />
      {showText && <span className="text-xs font-semibold">Verified Seller</span>}
    </div>
  );
};

export default VerifiedBadge;