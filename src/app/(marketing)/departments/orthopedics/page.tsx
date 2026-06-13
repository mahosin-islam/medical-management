import Image from "next/image";
import Link from "next/link";
import {
  Bone, CheckCircle2, Clock, CalendarPlus,
  ChevronRight, Users, Phone, ArrowRight,
} from "lucide-react";

export default function OrthopedicsPage() {
  return (
    <main className="min-h-screen bg-(--color-background)">

      <nav className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-(--color-muted-foreground)">
          <Link href="/" className="hover:text-(--color-primary)">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/departments" className="hover:text-(--color-primary)">Departments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-(--color-foreground) font-medium">Orthopedics</span>
        </div>
      </nav>

      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Orthopedics department"
          fill
          priority
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs mb-4 w-fit">
            <Bone className="w-3.5 h-3.5" />
            Department of Orthopedics
          </div>
          <h1 className="text-5xl font-medium text-white mb-3">Orthopedics</h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Comprehensive bone, joint, and musculoskeletal care — from minimally invasive
            arthroscopy and joint replacement to elite sports injury rehabilitation,
            helping you move freely again.
          </p>
        </div>
      </section>

      <div className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-4 divide-x divide-(--color-border)">
          {[
            { label: "Surgeries/year", value: "3,200+" },
            { label: "Orthopedists", value: "7" },
            { label: "Recovery rate", value: "96%" },
            { label: "Avg. rating", value: "4.8 ★" },
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
              ShifaCare's Orthopedics Department is a full-service musculoskeletal center
              with seven highly trained orthopedic surgeons specializing in joint replacement,
              spine surgery, trauma care, and sports medicine.
            </p>
            <p className="text-(--color-muted-foreground) leading-relaxed">
              Our surgical suites are equipped for minimally invasive arthroscopic procedures,
              reducing recovery time significantly. We combine surgical excellence with a
              structured rehabilitation program to ensure our patients return to full
              function as quickly as possible.
            </p>
          </div>

          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Services offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Total knee & hip replacement",
                "Arthroscopic surgery",
                "Fracture & trauma management",
                "Spine surgery & disc treatment",
                "Sports injury rehabilitation",
                "Osteoporosis management",
                "Pediatric orthopedics",
                "Hand & wrist surgery",
                "Shoulder & rotator cuff repair",
                "Post-surgical physiotherapy",
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
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80"
                alt="Orthopedic surgery"
                fill
                className="object-cover brightness-60"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Key procedures</h2>
                  <p className="text-white/70 text-sm">Precision surgery for lasting mobility</p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { title: "Knee replacement", desc: "Total or partial knee replacement restoring full weight-bearing function." },
                { title: "Spine surgery", desc: "Minimally invasive discectomy and fusion for chronic back and neck pain." },
                { title: "Sports rehab", desc: "Structured physiotherapy programs for ACL, rotator cuff, and tendon injuries." },
                { title: "Fracture fixation", desc: "Internal fixation using plates, screws, and nails for complex fractures." },
              ].map((p) => (
                <div key={p.title} className="p-4 rounded-xl bg-(--color-muted) border border-(--color-border)">
                  <p className="text-sm font-medium text-(--color-foreground) mb-1">{p.title}</p>
                  <p className="text-xs text-(--color-muted-foreground) leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-card">
            <h2 className="text-xl font-medium text-(--color-foreground) mb-5">Our orthopedists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Dr. Z. Haque", spec: "Joint Replacement", exp: "22 yrs", initials: "ZH", color: "#b45309" },
                { name: "Dr. P. Roy", spec: "Spine Surgery", exp: "17 yrs", initials: "PR", color: "#92400e" },
                { name: "Dr. L. Begum", spec: "Sports Medicine", exp: "12 yrs", initials: "LB", color: "#78350f" },
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
              <p className="text-white/70 text-sm mt-1">See an orthopedist this week.</p>
            </div>
            <div className="bg-(--color-card) p-4 space-y-2">
              <Link href="/patient/appointments?dept=orthopedics" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-(--color-primary) text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <CalendarPlus className="w-4 h-4" /> Book now
              </Link>
              <Link href="/patient/doctors?dept=orthopedics" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-(--color-border) text-(--color-foreground) text-sm hover:border-(--color-primary) transition-colors">
                <Users className="w-4 h-4" /> Browse doctors
              </Link>
            </div>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-(--color-primary)" /> OPD timings
            </h3>
            {[
              { day: "Sat – Wed", time: "9:00 AM – 1:30 PM" },
              { day: "Sat – Wed", time: "5:30 PM – 8:00 PM" },
              { day: "Thursday", time: "9:00 AM – 12:00 PM" },
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
              <h3 className="text-sm font-medium text-(--color-foreground)">Ortho emergency</h3>
            </div>
            <p className="text-xs text-(--color-muted-foreground) mb-3 leading-relaxed">
              For fractures, dislocations, or severe joint injuries.
            </p>
            <p className="text-xl font-medium text-(--color-primary)">+880 1800-SHIFA</p>
            <p className="text-xs text-(--color-muted-foreground) mt-0.5">Available 24 hours, 7 days</p>
          </div>

          <div className="sc-card">
            <h3 className="text-sm font-medium text-(--color-foreground) mb-3">Other departments</h3>
            {[
              { name: "Cardiology", href: "/departments/cardiology" },
              { name: "Pediatrics", href: "/departments/pediatrics" },
              { name: "Neurology", href: "/departments/neurology" },
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