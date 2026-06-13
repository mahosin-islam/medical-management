'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// রিকোয়ার্ড সোশ্যাল আইকনগুলো react-icons/fa6 থেকে নেওয়া হয়েছে
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import Image from 'next/image';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  socials: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

const bestDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Nadim Kamal",
    specialty: "Associate Eye Specialist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    id: 2,
    name: "Dr. Zinia Zara",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1712215544003-af10130f8eb3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socials: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    id: 3,
    name: "Dr. Jeffrey Davis",
    specialty: "Associate Eye Specialist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    id: 4,
    name: "Dr. Mariya",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#" }
  }
];

export default function BestDoctors() {
  const router = useRouter();

  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className=" bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title Header Area */}
        <div className="mb-16 text-center md:text-left space-y-2">
          <div className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary">
            Our Faculty
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Our Best Doctors
          </h2>
        </div>

        {/* 4-Column Responsive Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {bestDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => router.push(`/doctors/${doc.id}`)}
              className="group relative bg-white dark:bg-card border border-slate-100 dark:border-border/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
            >

              {/* Doctor Visual Port Container */}
              <div className="w-full aspect-[4/5] bg-slate-50 dark:bg-muted/10 rounded-xl overflow-hidden relative">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top pointer-events-none"
                  fill // width/height এর বদলে fill ব্যবহার করা হলো
                  priority

                />

                {/* Identity Presentation Board - (আপনার স্ক্রিনশটের ডিজাইনের অবিকল রূপ) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-[#12283c] dark:bg-[#111c24] text-white rounded-xl p-4 text-center border border-white/5 shadow-lg transition-all duration-300 flex flex-col justify-center items-center">

                  {/* Text Information Core */}
                  <h4 className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-300/90 font-medium mt-0.5 tracking-wide">
                    {doc.specialty}
                  </p>

                  {/* Social Action Deck - মাউস হোভার করলে এটি ১ম কার্ড থেকে কনভার্ট হয়ে ২য় কার্ডের মতো রিভিল হবে */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-3 group-hover:pt-2.5 group-hover:border-t group-hover:border-white/10 w-full">
                    <div className="overflow-hidden flex items-center justify-center gap-5">

                      <button
                        onClick={(e) => handleSocialClick(e, doc.socials.facebook)}
                        className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Facebook Profile"
                      >
                        <FaFacebookF size={13} />
                      </button>

                      <button
                        onClick={(e) => handleSocialClick(e, doc.socials.twitter)}
                        className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="X Profile"
                      >
                        <FaXTwitter size={13} />
                      </button>

                      <button
                        onClick={(e) => handleSocialClick(e, doc.socials.linkedin)}
                        className="text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="LinkedIn Network"
                      >
                        <FaLinkedinIn size={13} />
                      </button>

                    </div>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}