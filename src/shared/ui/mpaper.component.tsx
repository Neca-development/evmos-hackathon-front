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
        'p-5 text-white ring-1 ring-light-gray bg-transparent',
        className
      )}
      {...otherProperties}
    >
      {children}
    </Paper>
  )
}
