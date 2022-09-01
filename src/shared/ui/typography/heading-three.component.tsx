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
    <h3 className={classNames('text-base', className)} {...otherProperties}>
      {children}
    </h3>
  )
}
