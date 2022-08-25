import { Typography } from '@mui/material'
import classNames from 'classnames'
import * as React from 'react'

interface IHeadingFourProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function HeadingFour(props: IHeadingFourProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <Typography
      className={classNames('text-sm', className)}
      component="h4"
      {...otherProperties}
    >
      {children}
    </Typography>
  )
}
