import classNames from 'classnames'
import * as React from 'react'

interface IMainContainerProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function MainContainer(props: IMainContainerProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <main className={classNames('m-6', className)} {...otherProperties}>
      {children}
    </main>
  )
}
