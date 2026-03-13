interface StatsCardProps {
  label: string
  value: number | string
  icon: string
  trend?: string
}

export default function StatsCard({ label, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {trend && (
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      )}
    </div>
  )
}
