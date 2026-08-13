import Image from "next/image";
import Link from "next/link";
import {
  Baby, CheckCircle2, Clock, CalendarPlus,
  ChevronRight, Users, Phone, ArrowRight,
} from "lucide-react";

export default function PediatricsPage() {
  return (
    <main className="min-h-screen bg-(--color-background)">

      {/* Breadcrumb */}
      <nav className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-(--color-muted-foreground)">
          <Link href="/" className="hover:text-(--color-primary)">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/departments" className="hover:text-(--color-primary)">Departments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-(--color-foreground) font-medium">Pediatrics</span>
        </div>
      </nav>
      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <div className="relative w-full h-[350px] sm:h-[450px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1400&q=80"
            alt="Cardiology department"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.4]"
          />
        </div>



        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs mb-4 w-fit">
            <Baby className="w-3.5 h-3.5" />
            Department of Pediatrics
          </div>
          <h1 className="text-5xl font-medium text-white mb-3">Pediatrics</h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Gentle, expert care for your little ones — from newborns in our NICU to
            teenagers in our adolescent health clinic. Because every child deserves
            the very best start in life.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-4 divide-x divide-(--color-border)">
          {[
            { label: "Children treated", value: "5,000+" },
            { label: "Pediatricians", value: "6" },
            { label: "Emergency care", value: "24/7" },
            { label: "Avg. rating", value: "4.8 ★" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-2xl font-medium text-(--color-primary)">{s.value}</p>
              <p className="text-xs text-(--color-muted-foreground) mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">

          {/* About */}
          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-4">About the department</h2>
            <p className="text-(--color-muted-foreground) leading-relaxed mb-3">
              ShifaCares Pediatrics Department offers comprehensive medical care for children
              from birth through adolescence. Our team of six dedicated pediatricians and
              specialist nurses work together to provide a warm, child-friendly environment
              where young patients feel safe and cared for.
            </p>
            <p className="text-(--color-muted-foreground) leading-relaxed">
              Our department houses a Level III NICU for critically ill newborns, a fully
              equipped vaccination clinic, and specialist clinics for nutrition, development,
              and respiratory health — all under one roof.
            </p>
          </div>

          {/* Services */}
          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Services offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Well-child visits & growth monitoring",
                "Vaccination & immunization",
                "Neonatal intensive care (NICU)",
                "Pediatric nutrition counseling",
                "Developmental & behavioral assessment",
                "Childhood infection management",
                "Respiratory & asthma clinic",
                "Adolescent health services",
                "Pediatric emergency care",
                "Newborn screening programs",
              ].map((svc) => (
                <div key={svc} className="flex items-center gap-2.5 text-sm text-(--color-foreground)">
                  <CheckCircle2 className="w-4 h-4 text-(--color-primary) shrink-0" />
                  {svc}
                </div>
              ))}
            </div>
          </div>

          {/* Procedures with image */}
          <div className="sc-card overflow-hidden p-0">
            <div className="relative h-52">
              <Image
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&q=80"
                alt="Pediatric care"
                fill
                className="object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Key procedures</h2>
                  <p className="text-white/70 text-sm">Child-safe, evidence-based treatments</p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { title: "NICU care", desc: "Round-the-clock intensive care for premature and critically ill newborns." },
                { title: "Vaccination", desc: "Full EPI schedule and travel vaccinations administered by trained nurses." },
                { title: "Growth tracking", desc: "Regular anthropometric monitoring with WHO-standard growth charts." },
                { title: "Respiratory therapy", desc: "Nebulization, oxygen therapy, and asthma management for children." },
              ].map((p) => (
                <div key={p.title} className="p-4 rounded-xl bg-(--color-muted) border border-(--color-border)">
                  <p className="text-sm font-medium text-(--color-foreground) mb-1">{p.title}</p>
                  <p className="text-xs text-(--color-muted-foreground) leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Doctors */}
          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Our pediatricians</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Dr. F. Hossain", spec: "Neonatology", exp: "16 yrs", initials: "FH", color: "#7c3aed" },
                { name: "Dr. S. Rahman", spec: "General Pediatrics", exp: "12 yrs", initials: "SR", color: "#db2777" },
                { name: "Dr. M. Akter", spec: "Pediatric Nutrition", exp: "9 yrs", initials: "MA", color: "#0284c7" },
              ].map((doc) => (
                <div key={doc.name} className="border border-(--color-border) rounded-xl p-4 text-center hover:border-(--color-primary) transition-colors">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: doc.color }}
                  >
                    {doc.initials}
                  </div>
                  <p className="text-sm font-medium text-(--color-foreground)">{doc.name}</p>
                  <p className="text-xs text-(--color-muted-foreground) mt-0.5">{doc.spec}</p>
                  <p className="text-xs text-(--color-primary) mt-1">{doc.exp} experience</p>
                  <div className="badge-success mt-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Available
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-xl overflow-hidden border border-(--color-primary)">
            <div className="bg-(--color-primary) p-5">
              <CalendarPlus className="w-7 h-7 text-white mb-2" />
              <h3 className="text-white font-medium text-base">Book an appointment</h3>
              <p className="text-white/70 text-sm mt-1">For your childs health, today.</p>
            </div>
            <div className="bg-(--color-card) p-4 space-y-2">
              <Link href="/patient/appointments?dept=pediatrics" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-(--color-primary) text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <CalendarPlus className="w-4 h-4" /> Book now
              </Link>
              <Link href="/patient/doctors?dept=pediatrics" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-(--color-border) text-(--color-foreground) text-sm hover:border-(--color-primary) transition-colors">
                <Users className="w-4 h-4" /> Browse doctors
              </Link>
            </div>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-(--color-primary)" /> OPD timings
            </h3>
            {[
              { day: "Sat – Thu", time: "8:00 AM – 2:00 PM" },
              { day: "Sat – Thu", time: "4:00 PM – 7:00 PM" },
              { day: "Emergency", time: "24 hours" },
              { day: "Friday", time: "Emergency only" },
            ].map((t) => (
              <div key={t.day + t.time} className="flex justify-between py-2 border-b border-(--color-border) last:border-0 text-sm">
                <span className="text-(--color-muted-foreground)">{t.day}</span>
                <span className="text-(--color-primary) font-medium">{t.time}</span>
              </div>
            ))}
          </div>

          <div className="sc-card bg-(--color-accent) border-(--color-primary)/30">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-(--color-primary)" />
              <h3 className="text-sm font-medium text-(--color-foreground)">Pediatric emergency</h3>
            </div>
            <p className="text-xs text-(--color-muted-foreground) mb-3 leading-relaxed">
              For high fever, breathing difficulty, or infant emergencies.
            </p>
            <p className="text-xl font-medium text-(--color-primary)">+880 1800-SHIFA</p>
            <p className="text-xs text-(--color-muted-foreground) mt-0.5">Available 24 hours, 7 days</p>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3">Other departments</h3>
            {[
              { name: "Cardiology", href: "/departments/cardiology" },
              { name: "Neurology", href: "/departments/neurology" },
              { name: "Orthopedics", href: "/departments/orthopedics" },
            ].map((d) => (
              <Link key={d.name} href={d.href} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-(--color-accent) transition-colors group">
                <span className="text-sm text-(--color-foreground)">{d.name}</span>
                <ArrowRight className="w-4 h-4 text-(--color-muted-foreground) group-hover:text-(--color-primary) transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}