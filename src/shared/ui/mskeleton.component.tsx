import { Skeleton } from '@mui/material'
import classNames from 'classnames'

interface IMSkeletonProperties {
  [otherProperties: string]: any
  className?: string
}

export function MSkeleton(props: IMSkeletonProperties) {
  const { className, ...otherProperties } = props

  return (
    <Skeleton
      variant="rounded"
      className={classNames('bg-light-gray', className)}
      {...otherProperties}
    />
  )
}
