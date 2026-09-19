import { CornerFrame } from "@/registry/dashboardcn/ui/corner-frame"

export default function CornerFrameDemo() {
  return (
    <div className="grid w-full gap-5 sm:grid-cols-2">
      <CornerFrame className="bg-card p-8" cornerColor="var(--color-sky-500)">
        <p className="font-medium">Registration frame</p>
        <p className="text-muted-foreground mt-1 text-sm">Quiet edges with a precise color signal.</p>
      </CornerFrame>
      <CornerFrame className="bg-muted/30 p-8" cornerSize={16} cornerColor="var(--color-amber-500)">
        <p className="font-medium">Long corners</p>
        <p className="text-muted-foreground mt-1 text-sm">Tune the mark length and color per surface.</p>
      </CornerFrame>
    </div>
  )
}
