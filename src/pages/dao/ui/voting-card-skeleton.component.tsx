import { MPaper, MSkeleton } from '@shared/ui'

export function VotingCardSkeleton() {
  return (
    <MPaper className="w-full space-y-3">
      <div className="space-x-14 flex justify-between items-center">
        <MSkeleton className="w-full text-base" />
        <MSkeleton variant="rounded" className="h-[1.4rem] w-[4rem]" />
      </div>

      <MSkeleton variant="rounded" className="h-[2rem] w-full" />
      <MSkeleton variant="rounded" className="h-[8rem] w-full" />
    </MPaper>
  )
}
