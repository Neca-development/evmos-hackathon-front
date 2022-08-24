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
    <main
      className={classNames('max-w-[1400px] mx-auto py-5', className)}
      {...otherProperties}
    >
      {children}
    </main>
  )
}
