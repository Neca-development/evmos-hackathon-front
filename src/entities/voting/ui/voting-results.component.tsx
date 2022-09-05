import { HeadingFour } from '@shared/ui'

interface IVotingResultsProperties {
  label: string
  percents: number
  isUserVoted: boolean
}

export function VotingResults(props: IVotingResultsProperties) {
  const { label, percents, isUserVoted } = props

  return (
    <div className="grid grid-cols-11 gap-x-3">
      <div className="grid grid-rows-2 justify-items-end">
        <HeadingFour>{percents}%</HeadingFour>
        {/* Is user voted mark */}
        {isUserVoted && (
          <div className="self-center aspect-square w-2 rounded-full bg-orange" />
        )}
        {/* /Is user voted mark */}
      </div>

      <div className="col-span-10 grid grid-rows-2">
        <HeadingFour>{label}</HeadingFour>
        {/* Voting progress */}
        <div className="self-center relative h-[0.15rem] w-full rounded-full bg-white">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-orange"
            style={{ width: `${percents}%` }}
          />
        </div>
        {/* /Voting progress */}
      </div>
    </div>
  )
}
