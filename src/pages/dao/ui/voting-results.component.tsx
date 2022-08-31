interface IVotingResultsProperties {
  positiveVotesPercents: number
  negativeVotesPercents: number
}

export function VotingResults(props: IVotingResultsProperties) {
  const { positiveVotesPercents, negativeVotesPercents } = props

  return (
    <div>
      <p>{positiveVotesPercents}%</p>
      <p>{negativeVotesPercents}%</p>
    </div>
  )
}
