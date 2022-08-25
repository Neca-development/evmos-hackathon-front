import { Button } from '@mui/material'
import classNames from 'classnames'
import * as React from 'react'

interface IMButtonProperties {
  [otherProperties: string]: any
  variant?: 'primary' | 'secondary'
  className?: string
  children?: React.ReactNode
}

export function MButton(props: IMButtonProperties) {
  const { variant = 'primary', className, children, ...otherProperties } = props
  return (
    <Button
      variant="contained"
      className={classNames(
        'py-2 px-5 normal-case text-[0.7rem] text-white',
        variant === 'primary' && 'bg-orange',
        variant === 'secondary' &&
          'bg-transparent hover:bg-transparent hover:ring-2 hover:ring-orange',
        className
      )}
      {...otherProperties}
    >
      {children}
    </Button>
  )
}
