import { Typography } from '@mui/material'
import classNames from 'classnames'
import * as React from 'react'

interface IHeadingThreeProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function HeadingThree(props: IHeadingThreeProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <Typography
      className={classNames('text-xl', className)}
      component="h3"
      {...otherProperties}
    >
      {children}
    </Typography>
  )
}
