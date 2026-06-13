// app/departments/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse, Baby, Brain, Bone,
  ArrowRight, CheckCircle2, Users, Star,
} from "lucide-react";

const departments = [
  {
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Advanced Heart Care",
    description:
      "State-of-the-art diagnostics and interventional procedures for all cardiac conditions — from routine ECGs to complex angioplasty.",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
    accentColor: "#dc2626",
    icon: <HeartPulse className="w-6 h-6" />,
    stats: [
      { label: "Procedures/year", value: "2,400+" },
      { label: "Cardiologists", value: "8" },
      { label: "Success rate", value: "98%" },
    ],
    services: [
      "ECG & Echocardiography",
      "Angiography & Angioplasty",
      "Pacemaker implantation",
    ],
    doctorCount: 8,
    rating: 4.9,
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    tagline: "Compassionate Child Care",
    description:
      "Dedicated care for newborns, children, and adolescents from birth through 18 years — including NICU, vaccination, and developmental clinics.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80",
    accentColor: "#7c3aed",
    icon: <Baby className="w-6 h-6" />,
    stats: [
      { label: "Children treated", value: "5,000+" },
      { label: "Pediatricians", value: "6" },
      { label: "Emergency care", value: "24/7" },
    ],
    services: [
      "Well-child visits & growth monitoring",
      "Vaccination & immunization",
      "Neonatal intensive care (NICU)",
    ],
    doctorCount: 6,
    rating: 4.8,
  },
  {
    slug: "neurology",
    name: "Neurology",
    tagline: "Expert Brain & Nerve Care",
    description:
      "Advanced diagnosis and treatment of brain, spinal cord, and nervous system disorders using 3T MRI, EEG, and a dedicated stroke unit.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    accentColor: "#4f46e5",
    icon: <Brain className="w-6 h-6" />,
    stats: [
      { label: "Cases/year", value: "1,800+" },
      { label: "Neurologists", value: "5" },
      { label: "MRI available", value: "3T" },
    ],
    services: [
      "MRI & CT brain imaging",
      "EEG & nerve conduction study",
      "Stroke management unit",
    ],
    doctorCount: 5,
    rating: 4.7,
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    tagline: "Bone & Joint Specialists",
    description:
      "Comprehensive musculoskeletal care with minimally invasive surgery, joint replacement, spine surgery, and sports injury rehabilitation.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accentColor: "#b45309",
    icon: <Bone className="w-6 h-6" />,
    stats: [
      { label: "Surgeries/year", value: "3,200+" },
      { label: "Orthopedists", value: "7" },
      { label: "Recovery rate", value: "96%" },
    ],
    services: [
      "Joint replacement (knee, hip)",
      "Arthroscopic surgery",
      "Sports injury rehabilitation",
    ],
    doctorCount: 7,
    rating: 4.8,
  },
];

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-(--color-background)">

      {/* Page Header */}
      <section className="bg-(--color-card) border-b border-(--color-border)">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-(--color-primary) mb-4">
            ShifaCare Medical Center
          </span>
          <h1 className="text-4xl font-medium text-(--color-foreground) mb-4 leading-tight">
            Our departments
          </h1>
          <p className="text-(--color-muted-foreground) text-lg max-w-2xl leading-relaxed">
            World-class specialists across four core departments — delivering
            evidence-based care with compassion every day.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-8 mt-8 pt-8 border-t border-(--color-border)">
            {[
              { label: "Total specialists", value: "26+" },
              { label: "Patients served", value: "12,000+" },
              { label: "Years of service", value: "15+" },
              { label: "Avg. rating", value: "4.8 ★" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xl font-medium text-(--color-primary)">{item.value}</p>
                <p className="text-xs text-(--color-muted-foreground)">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group sc-card overflow-hidden p-0 hover:border-(--color-primary) transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dept.image}
                  alt={`${dept.name} department`}
                  fill
                  className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Icon badge */}
                <div
                  className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: dept.accentColor }}
                >
                  {dept.icon}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 border border-white/20">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-medium">{dept.rating}</span>
                </div>

                {/* Name */}
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-medium text-white">{dept.name}</h2>
                  <p className="text-white/75 text-sm mt-0.5">{dept.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-(--color-muted-foreground) text-sm leading-relaxed mb-5">
                  {dept.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {dept.stats.map((s) => (
                    <div key={s.label} className="bg-(--color-muted) rounded-lg p-3 text-center">
                      <p className="text-base font-medium text-(--color-primary)">{s.value}</p>
                      <p className="text-[11px] text-(--color-muted-foreground) mt-0.5 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <ul className="space-y-2 mb-5">
                  {dept.services.map((svc) => (
                    <li key={svc} className="flex items-center gap-2.5 text-sm text-(--color-foreground)">
                      <CheckCircle2 className="w-4 h-4 text-(--color-primary) shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-(--color-border)">
                  <div className="flex items-center gap-1.5 text-sm text-(--color-muted-foreground)">
                    <Users className="w-4 h-4" />
                    {dept.doctorCount} specialists
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-(--color-primary) group-hover:gap-2 transition-all duration-200">
                    View department <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}