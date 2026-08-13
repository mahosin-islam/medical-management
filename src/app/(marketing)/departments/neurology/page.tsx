import Image from "next/image";
import Link from "next/link";
import {
  Brain, CheckCircle2, Clock, CalendarPlus,
  ChevronRight, Users, Phone, ArrowRight,
} from "lucide-react";

export default function NeurologyPage() {
  return (
    <main className="min-h-screen bg-(--color-background)">

      <nav className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-(--color-muted-foreground)">
          <Link href="/" className="hover:text-(--color-primary)">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/departments" className="hover:text-(--color-primary)">Departments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-(--color-foreground) font-medium">Neurology</span>
        </div>
      </nav>

      <section className="relative h-[420px] overflow-hidden">
  

<div className="relative w-full h-[350px] sm:h-[450px] overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=80"
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
            <Brain className="w-3.5 h-3.5" />
            Department of Neurology
          </div>
          <h1 className="text-5xl font-medium text-white mb-3">Neurology</h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Expert diagnosis and treatment of the brain, spinal cord, and nervous system —
            backed by a 3T MRI suite, dedicated stroke unit, and neurologists with
            decades of combined experience.
          </p>
        </div>
      </section>

      <div className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-4 divide-x divide-(--color-border)">
          {[
            { label: "Cases/year", value: "1,800+" },
            { label: "Neurologists", value: "5" },
            { label: "MRI available", value: "3T" },
            { label: "Avg. rating", value: "4.7 ★" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-2xl font-medium text-(--color-primary)">{s.value}</p>
              <p className="text-xs text-(--color-muted-foreground) mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-4">About the department</h2>
            <p className="text-(--color-muted-foreground) leading-relaxed mb-3">
              The Neurology Department at ShifaCare provides specialized care for a full
              range of neurological conditions — from common headaches and migraines to
              complex disorders like Parkinson&apos;s disease, epilepsy, and stroke. {/* FIXED LINE */}
            </p>
            <p className="text-(--color-muted-foreground) leading-relaxed">
              Our department features a dedicated Stroke Unit with rapid-response protocols,
              a state-of-the-art 3 Tesla MRI, and an EEG laboratory for accurate brain
              activity monitoring. Every patient receives a personalized, multidisciplinary
              care plan.
            </p>
          </div>

          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Services offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "3T MRI & CT brain imaging",
                "EEG & nerve conduction study",
                "Stroke management unit",
                "Epilepsy & seizure clinic",
                "Headache & migraine clinic",
                "Parkinson's disease management",
                "Dementia & memory clinic",
                "Peripheral neuropathy care",
                "Multiple sclerosis treatment",
                "Neuro-rehabilitation program",
              ].map((svc) => (
                <div key={svc} className="flex items-center gap-2.5 text-sm text-(--color-foreground)">
                  <CheckCircle2 className="w-4 h-4 text-(--color-primary) shrink-0" />
                  {svc}
                </div>
              ))}
            </div>
          </div>

          <div className="sc-card overflow-hidden p-0">
            <div className="relative h-52">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
                alt="Neurological imaging"
                fill
                className="object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Key procedures</h2>
                  <p className="text-white/70 text-sm">Precision diagnostics for complex neurological conditions</p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { title: "EEG monitoring", desc: "Records brain electrical activity to diagnose epilepsy and sleep disorders." },
                { title: "3T MRI imaging", desc: "High-resolution brain and spine imaging for accurate lesion detection." },
                { title: "Nerve conduction", desc: "Measures nerve signal speed to detect peripheral neuropathy and carpal tunnel." },
                { title: "Stroke unit care", desc: "Rapid tPA therapy and monitored recovery for acute ischemic stroke patients." },
              ].map((p) => (
                <div key={p.title} className="p-4 rounded-xl bg-(--color-muted) border border-(--color-border)">
                  <p className="text-sm font-medium text-(--color-foreground) mb-1">{p.title}</p>
                  <p className="text-xs text-(--color-muted-foreground) leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Our neurologists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Dr. K. Mahmud", spec: "Stroke & Epilepsy", exp: "20 yrs", initials: "KM", color: "#4f46e5" },
                { name: "Dr. T. Jahan", spec: "Neuro-imaging", exp: "13 yrs", initials: "TJ", color: "#7c3aed" },
                { name: "Dr. A. Bhuiyan", spec: "Movement Disorders", exp: "10 yrs", initials: "AB", color: "#6d28d9" },
              ].map((doc) => (
                <div key={doc.name} className="border border-(--color-border) rounded-xl p-4 text-center hover:border-(--color-primary) transition-colors">
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-medium" style={{ backgroundColor: doc.color }}>
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

        <div className="space-y-5">
          <div className="rounded-xl overflow-hidden border border-(--color-primary)">
            <div className="bg-(--color-primary) p-5">
              <CalendarPlus className="w-7 h-7 text-white mb-2" />
              <h3 className="text-white font-medium text-base">Book an appointment</h3>
              <p className="text-white/70 text-sm mt-1">Consult a neurologist this week.</p>
            </div>
            <div className="bg-(--color-card) p-4 space-y-2">
              <Link href="/patient/appointments?dept=neurology" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-(--color-primary) text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <CalendarPlus className="w-4 h-4" /> Book now
              </Link>
              <Link href="/patient/doctors?dept=neurology" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-(--color-border) text-(--color-foreground) text-sm hover:border-(--color-primary) transition-colors">
                <Users className="w-4 h-4" /> Browse doctors
              </Link>
            </div>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-(--color-primary)" /> OPD timings
            </h3>
            {[
              { day: "Sat – Wed", time: "10:00 AM – 2:00 PM" },
              { day: "Sat – Wed", time: "6:00 PM – 8:00 PM" },
              { day: "Thursday", time: "10:00 AM – 1:00 PM" },
              { day: "Friday", time: "Closed" },
            ].map((t, idx) => ( // FIXED KEY USING INDEX
              <div key={idx} className="flex justify-between py-2 border-b border-(--color-border) last:border-0 text-sm">
                <span className="text-(--color-muted-foreground)">{t.day}</span>
                <span className={t.time === "Closed" ? "text-red-500 font-medium" : "text-(--color-primary) font-medium"}>{t.time}</span>
              </div>
            ))}
          </div>

          <div className="sc-card bg-(--color-accent) border-(--color-primary)/30">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-(--color-primary)" />
              <h3 className="text-sm font-medium text-(--color-foreground)">Neuro emergency</h3>
            </div>
            <p className="text-xs text-(--color-muted-foreground) mb-3 leading-relaxed">
              Sudden weakness, speech loss, or seizure — act immediately.
            </p>
            <p className="text-xl font-medium text-(--color-primary)">+880 1800-SHIFA</p>
            <p className="text-xs text-(--color-muted-foreground) mt-0.5">Available 24 hours, 7 days</p>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3">Other departments</h3>
            {[
              { name: "Cardiology", href: "/departments/cardiology" },
              { name: "Pediatrics", href: "/departments/pediatrics" },
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