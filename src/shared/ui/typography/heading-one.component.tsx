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
    <h1 className={classNames('text-xl', className)} {...otherProperties}>
      {children}
    </h1>
  )
}
