import { MDivider, MPaper, MSkeleton } from '@shared/ui'

export function DaoCardSkeleton() {
  return (
    <MPaper className="w-full space-y-3">
      <div className="space-x-4 flex">
        <div>
          <MSkeleton variant="rounded" className="h-[6rem] w-[6rem]" />
        </div>
        <div className="w-full py-2 flex flex-col">
          <MSkeleton className="mb-3 text-base" />
          <MSkeleton variant="rectangular" className="h-[3rem]" />
        </div>
      </div>

      <MDivider />

      <MSkeleton className="w-full text-sm" />
      <div className="flex justify-between items-end">
        <MSkeleton variant="rounded" className="h-14 w-14" />
        <MSkeleton variant="rounded" className="h-8 w-[4.2rem]" />
      </div>
    </MPaper>
  )
}
