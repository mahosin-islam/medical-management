'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut } from 'lucide-react'; // দেখতে সুন্দর লাগার জন্য আইকন (ঐচ্ছিক)

function Logout() {

  const [isLoading, setIsLoading] = useState(false); // লোডিং স্টেট

  async function handleLogOut() {
    try {
      setIsLoading(true); // লগআউট শুরু হলে লোডিং ট্রু হবে
      
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log('Successfully logged out');
            
            // 🌟 নেভবারের স্টেট একদম ইনস্ট্যান্ট আপডেট করার জন্য এবং হোমপেজে রিডাইরেক্টের জন্য বেস্ট উপায়
            window.location.href = "/"; 
          },
          onError: (ctx) => {
            console.error('Logout error:', ctx.error);
            setIsLoading(false); // এরর হলে লোডিং বন্ধ হবে
          }
        },
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <button 
      onClick={handleLogOut}
      disabled={isLoading} // লোডিং অবস্থায় বাটনে ডাবল ক্লিক করা বন্ধ করবে
      className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer text-red-600 hover:bg-red-50/50 rounded-xl"
    >
      <LogOut className="w-4 h-4" />
      <span>{isLoading ? "Logging out..." : "Log out"}</span>
    </button>
  );
}

export default Logout;