import { Typography } from '@mui/material'
import classNames from 'classnames'
import * as React from 'react'

interface IHeadingOneProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function HeadingOne(props: IHeadingOneProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <Typography
      className={classNames('text-4xl', className)}
      component="h1"
      {...otherProperties}
    >
      {children}
    </Typography>
  )
}
