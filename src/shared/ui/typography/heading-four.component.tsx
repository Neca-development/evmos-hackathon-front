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
    <h4 className={classNames('text-sm', className)} {...otherProperties}>
      {children}
    </h4>
  )
}
