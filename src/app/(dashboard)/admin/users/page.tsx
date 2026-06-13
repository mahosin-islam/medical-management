import { CheckCircle2, Clock } from 'lucide-react'
import React from 'react'

function UserPage() {
  return (
    <div>
        <h2>hello user page</h2>
        <div className="flex items-center justify-between p-4 border-b border-border">
      <div>
        <p className="text-sm font-medium text-foreground">Dr. Asif Rahman</p>
        <p className="text-xs text-muted-foreground">Cardiologist</p>
      </div>

      {/* Badges implementation */}
      <div className="flex gap-2">
        {/* Completed Status Badge */}
        <span className="badge-success">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completed
        </span>

        {/* Pending Status Badge */}
        <span className="badge-pending">
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      </div>
    </div>
    </div>
  )
}

export default UserPage