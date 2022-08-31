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
        'py-1 px-4 normal-case text-[0.7rem] text-white',
        variant === 'primary' &&
          'bg-orange hover:bg-dark-orange disabled:bg-dark-orange disabled:pointer-events-auto disabled:cursor-not-allowed',
        variant === 'secondary' &&
          'bg-transparent ring-2 ring-light-gray hover:bg-transparent hover:ring-2 hover:ring-orange',
        className
      )}
      {...otherProperties}
    >
      {children}
    </Button>
  )
}
