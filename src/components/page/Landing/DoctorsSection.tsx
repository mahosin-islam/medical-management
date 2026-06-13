
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Award,
  Video,
  MessageCircle,
  ChevronRight
} from "lucide-react";

// Hardcoded Doctors Data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Md. Abdur Rahman",
    degree: "MBBS, FCPS (Medicine), MD (Cardiology)",
    specialty: "Cardiologist & Medicine Specialist",
    experience: 15,
    rating: 4.9,
    totalReviews: 1240,
    hospital: "Dhaka Medical College Hospital",
    chamberAddress: "Room No: 205, 2nd Floor, DMC Hospital, Shahbag, Dhaka-1000",
    chamberTime: "Sat, Mon, Wed: 6:00 PM - 9:00 PM | Sun, Tue, Thu: 10:00 AM - 1:00 PM",
    fee: 1200,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    education: [
      "MBBS - Dhaka Medical College (2005)",
      "FCPS - Bangladesh College of Physicians and Surgeons (2010)",
      "MD (Cardiology) - National Institute of Cardiovascular Diseases (2015)"
    ],
    specialization: ["Heart Disease", "Hypertension", "Diabetes", "Cholesterol Management"],
    languages: ["Bengali", "English", "Urdu"],
    onlineConsultation: true,
    chamberPhone: "+880 1712-345678"
  },
  {
    id: 2,
    name: "Dr. Sabrina Ahmed",
    degree: "MBBS, DGO, FCPS (Gynae)",
    specialty: "Gynecologist & Obstetrician",
    experience: 12,
    rating: 4.8,
    totalReviews: 980,
    hospital: "Square Hospital Ltd.",
    chamberAddress: "Level 4, Square Hospital, Panthapath, Dhaka-1205",
    chamberTime: "Sun, Tue, Thu: 4:00 PM - 8:00 PM | Mon, Wed: 10:00 AM - 2:00 PM",
    fee: 1500,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    education: [
      "MBBS - Sir Salimullah Medical College (2008)",
      "DGO - Bangabandhu Sheikh Mujib Medical University (2012)",
      "FCPS (Gynae) - Bangladesh College of Physicians and Surgeons (2016)"
    ],
    specialization: ["Pregnancy Care", "Infertility Treatment", "Women's Health", "Menstrual Disorders"],
    languages: ["Bengali", "English", "Hindi"],
    onlineConsultation: true,
    chamberPhone: "+880 1713-456789"
  },
  {
    id: 3,
    name: "Dr. Mohammad Ali Hasan",
    degree: "MBBS, MS (Ortho), FICS",
    specialty: "Orthopedic Surgeon",
    experience: 18,
    rating: 4.9,
    totalReviews: 1520,
    hospital: "United Hospital Ltd.",
    chamberAddress: "Block B, United Hospital, Gulshan-2, Dhaka-1212",
    chamberTime: "Sat, Mon, Wed: 7:00 PM - 10:00 PM | Tue, Thu: 3:00 PM - 6:00 PM",
    fee: 1800,
    available: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    education: [
      "MBBS - Chittagong Medical College (2002)",
      "MS (Ortho) - National Institute of Traumatology (2008)",
      "FICS - International College of Surgeons (2012)"
    ],
    specialization: ["Joint Replacement", "Spine Surgery", "Arthroscopy", "Sports Injury"],
    languages: ["Bengali", "English", "Arabic"],
    onlineConsultation: false,
    chamberPhone: "+880 1714-567890"
  },
  {
    id: 4,
    name: "Dr. Mohammad Ali Hasan",
    degree: "MBBS, MS (Ortho), FICS",
    specialty: "Orthopedic Surgeon",
    experience: 18,
    rating: 4.9,
    totalReviews: 1520,
    hospital: "United Hospital Ltd.",
    chamberAddress: "Block B, United Hospital, Gulshan-2, Dhaka-1212",
    chamberTime: "Sat, Mon, Wed: 7:00 PM - 10:00 PM | Tue, Thu: 3:00 PM - 6:00 PM",
    fee: 1800,
    available: true,
    image: "https://images.unsplash.com/photo-1712215544003-af10130f8eb3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    education: [
      "MBBS - Chittagong Medical College (2002)",
      "MS (Ortho) - National Institute of Traumatology (2008)",
      "FICS - International College of Surgeons (2012)"
    ],
    specialization: ["Joint Replacement", "Spine Surgery", "Arthroscopy", "Sports Injury"],
    languages: ["Bengali", "English", "Arabic"],
    onlineConsultation: false,
    chamberPhone: "+880 1714-567890"
  },
 
];

export default function DoctorsSection() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleDoctorClick = (doctorId: number) => {
    router.push(`/doctors/${doctorId}`);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-muted/5 to-background py-8 md:py-14">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mb-12 text-center md:mb-16"
        >
        
         

          {/* Title */}
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Meet Our{" "}
            <span className="relative inline-block">
              Specialist Doctors
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-teal-400"
              />
            </span>
          </h2>
          
          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            Choose from our experienced doctors across various specialties for your healthcare needs
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctorsData.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: idx * 0.1, duration: 0.5 }
                }
              }}
              whileHover={{ y: -10 }}
              onClick={() => handleDoctorClick(doctor.id)}
              className="group relative cursor-pointer"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-2xl">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-transparent opacity-0 transition-all duration-500 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:opacity-100" />
                
                {/* Available Badge */}
                {doctor.available && (
                  <div className="absolute left-3 top-3 z-10">
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-semibold text-green-700 dark:text-green-300">Available Today</span>
                    </div>
                  </div>
                )}

                {/* Online Consultation Badge */}
                {doctor.onlineConsultation && (
                  <div className="absolute right-3 top-3 z-10">
                    <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                      <Video className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300">Online</span>
                    </div>
                  </div>
                )}

                {/* Doctor Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square w-full">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-lg dark:bg-gray-900">
                      View Details
                      <ChevronRight className="ml-1 inline h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-bold text-foreground line-clamp-1">
                    {doctor.name}
                  </h3>
                  <p className="mb-2 text-xs text-primary">
                    {doctor.degree.split(',')[0]} • {doctor.specialty}
                  </p>
                  
                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-semibold text-foreground">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({doctor.totalReviews} reviews)</span>
                    <div className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs text-muted-foreground">{doctor.experience}+ years</span>
                    </div>
                  </div>

                  {/* Location & Time */}
                  <div className="space-y-2 border-t border-border pt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {doctor.chamberAddress}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {doctor.chamberTime.split('|')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Fee & Booking */}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                      <p className="text-lg font-bold text-primary">৳{doctor.fee}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/doctors/${doctor.id}?book=true`);
                        }}
                        className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                      >
                        <Calendar className="mr-1 inline h-3 w-3" />
                        Book
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/doctors/${doctor.id}#contact`);
                        }}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted"
                      >
                        <MessageCircle className="mr-1 inline h-3 w-3" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated Border on Hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-primary to-teal-400"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }
          }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => router.push('/doctors')}
            className="group inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View All Doctors
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}