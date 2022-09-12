import { Paper } from '@mui/material'
import classNames from 'classnames'

interface IMPaperProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function MPaper(props: IMPaperProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <Paper
      className={classNames(
        'text-white ring-1 ring-light-gray rounded-md',
        className,
        className && !className.includes('p-') && 'p-5',
        className && !className.includes('bg-') && 'bg-transparent'
      )}
      {...otherProperties}
    >
      {children}
    </Paper>
  )
}
