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
    <h2 className={classNames('text-lg', className)} {...otherProperties}>
      {children}
    </h2>
  )
}
