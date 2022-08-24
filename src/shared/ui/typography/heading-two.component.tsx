import { Typography } from '@mui/material'
import classNames from 'classnames'
import * as React from 'react'

interface IHeadingTwoProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function HeadingTwo(props: IHeadingTwoProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <Typography
      className={classNames('text-2xl', className)}
      component="h2"
      {...otherProperties}
    >
      {children}
    </Typography>
  )
}
