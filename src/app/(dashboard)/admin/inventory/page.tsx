"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

function InvetorPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="sc-card max-w-lg w-full text-center space-y-5"
      >
        <div className="mx-auto w-14 h-14 bg-accent text-primary rounded-2xl flex items-center justify-center">
          <Package className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Inventory
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Medical inventory management is coming soon.
          </p>
        </div>

        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-1/3 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default InvetorPage