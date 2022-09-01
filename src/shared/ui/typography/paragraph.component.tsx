import classNames from 'classnames'
import * as React from 'react'

interface IParagraphProperties {
  [otherProperties: string]: any
  className?: string
  children?: React.ReactNode
}

export function Paragraph(props: IParagraphProperties) {
  const { className, children, ...otherProperties } = props
  return (
    <p className={classNames('m-0 text-[0.6rem]', className)} {...otherProperties}>
      {children}
    </p>
  )
}
