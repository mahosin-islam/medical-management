import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse, CheckCircle2, Clock, CalendarPlus,
  ChevronRight, Users,  Phone, ArrowRight,
} from "lucide-react";

export default function CardiologyPage() {
  return (
    <main className="min-h-screen bg-(--color-background)">

      {/* Breadcrumb */}
      <nav className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-(--color-muted-foreground)">
          <Link href="/" className="hover:text-(--color-primary)">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/departments" className="hover:text-(--color-primary)">Departments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-(--color-foreground) font-medium">Cardiology</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1400&q=80"
          alt="Cardiology department"
          fill
          priority
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs mb-4 w-fit">
            <HeartPulse className="w-3.5 h-3.5" />
            Department of Cardiology
          </div>
          <h1 className="text-5xl font-medium text-white mb-3">Cardiology</h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Advanced heart care powered by cutting-edge technology and a team of
            internationally trained cardiologists — delivering life-saving interventions
            with precision and compassion.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-4 divide-x divide-(--color-border)">
          {[
            { label: "Procedures/year", value: "2,400+" },
            { label: "Cardiologists", value: "8" },
            { label: "Success rate", value: "98%" },
            { label: "Avg. rating", value: "4.9 ★" },
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

        {/* Left — 2/3 */}
        <div className="lg:col-span-2 space-y-8">

          {/* About */}
          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-4">About the department</h2>
            <p className="text-(--color-muted-foreground) leading-relaxed mb-3">
              The Department of Cardiology at ShifaCare is a comprehensive cardiac care center
              equipped with the latest diagnostic and interventional technologies. Our team of
              eight expert cardiologists specializes in a full spectrum of heart conditions —
              from hypertension and arrhythmia to complex coronary artery disease.
            </p>
            <p className="text-(--color-muted-foreground) leading-relaxed">
              We operate a dedicated Cardiac ICU, a catheterization laboratory, and a non-invasive
              imaging suite. Whether you need a routine checkup or a life-saving angioplasty,
              ShifaCare Cardiology is equipped and ready.
            </p>
          </div>

          {/* Services */}
          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Services offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "ECG & Holter monitoring",
                "2D Echocardiography",
                "Stress test (TMT)",
                "Coronary angiography",
                "Angioplasty & stenting",
                "Pacemaker implantation",
                "Heart failure management",
                "Arrhythmia treatment",
                "Lipid & hypertension clinic",
                "Cardiac rehabilitation",
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
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80"
                alt="Cardiac procedure"
                fill
                className="object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Key procedures</h2>
                  <p className="text-white/70 text-sm">Minimally invasive, evidence-based interventions</p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { title: "Angioplasty", desc: "Restoring blood flow through blocked coronary arteries using balloon and stent." },
                { title: "Pacemaker", desc: "Implantable device to regulate abnormal heart rhythms safely and effectively." },
                { title: "Echocardiography", desc: "Ultrasound imaging to assess heart structure, valves, and function in real time." },
                { title: "Cardiac stress test", desc: "Exercise-based evaluation to detect coronary artery disease under controlled conditions." },
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
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Our cardiologists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Dr. S. Ahmed", spec: "Interventional Cardiology", exp: "18 yrs", initials: "SA", color: "#015668" },
                { name: "Dr. R. Khan", spec: "Heart Failure & ICU", exp: "14 yrs", initials: "RK", color: "#017a97" },
                { name: "Dr. N. Islam", spec: "Electrophysiology", exp: "11 yrs", initials: "NI", color: "#013d4d" },
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

        {/* Right sidebar — 1/3 */}
        <div className="space-y-5">

          {/* Book appointment */}
          <div className="rounded-xl overflow-hidden border border-(--color-primary)">
            <div className="bg-(--color-primary) p-5">
              <CalendarPlus className="w-7 h-7 text-white mb-2" />
              <h3 className="text-white font-medium text-base">Book an appointment</h3>
              <p className="text-white/70 text-sm mt-1">See a cardiologist as early as tomorrow.</p>
            </div>
            <div className="bg-(--color-card) p-4 space-y-2">
              <Link
                href="/patient/appointments?dept=cardiology"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-(--color-primary) text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <CalendarPlus className="w-4 h-4" /> Book now
              </Link>
              <Link
                href="/patient/doctors?dept=cardiology"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-(--color-border) text-(--color-foreground) text-sm hover:border-(--color-primary) transition-colors"
              >
                <Users className="w-4 h-4" /> Browse doctors
              </Link>
            </div>
          </div>

          {/* OPD Timings */}
          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-(--color-primary)" /> OPD timings
            </h3>
            {[
              { day: "Sat – Wed", time: "9:00 AM – 1:00 PM" },
              { day: "Sat – Wed", time: "5:00 PM – 8:00 PM" },
              { day: "Thursday", time: "9:00 AM – 12:00 PM" },
              { day: "Friday", time: "Closed" },
            ].map((t) => (
              <div key={t.day + t.time} className="flex justify-between py-2 border-b border-(--color-border) last:border-0 text-sm">
                <span className="text-(--color-muted-foreground)">{t.day}</span>
                <span className={t.time === "Closed" ? "text-red-500 font-medium" : "text-(--color-primary) font-medium"}>
                  {t.time}
                </span>
              </div>
            ))}
          </div>

          {/* Emergency */}
          <div className="sc-card bg-(--color-accent) border-(--color-primary)/30">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-(--color-primary)" />
              <h3 className="text-sm font-medium text-(--color-foreground)">Cardiac emergency</h3>
            </div>
            <p className="text-xs text-(--color-muted-foreground) mb-3 leading-relaxed">
              For chest pain, breathlessness, or cardiac arrest — call immediately.
            </p>
            <p className="text-xl font-medium text-(--color-primary)">+880 1800-SHIFA</p>
            <p className="text-xs text-(--color-muted-foreground) mt-0.5">Available 24 hours, 7 days</p>
          </div>

          {/* Other departments */}
          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3">Other departments</h3>
            {[
              { name: "Pediatrics", href: "/departments/pediatrics" },
              { name: "Neurology", href: "/departments/neurology" },
              { name: "Orthopedics", href: "/departments/orthopedics" },
            ].map((d) => (
              <Link
                key={d.name}
                href={d.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-(--color-accent) transition-colors group"
              >
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