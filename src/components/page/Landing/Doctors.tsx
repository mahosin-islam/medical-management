"use client";

import Singl from "@/components/Common/Singl";

export default function FeaturedDocsList({ initialDocs }: { initialDocs: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {initialDocs.map((doc: any) => (
        <Singl key={doc._id} doc={doc} />
      ))}
    </div>
  );
}