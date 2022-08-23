import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface IFormProperties {
  defaultValues: any
  children: any
  onSubmit?: any
  className?: string
}

export function Form({ defaultValues, children, onSubmit, className }: IFormProperties) {
  const methods = useForm({ defaultValues })
  const { handleSubmit, register } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames('', className)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...child.props,
              register,
              key: child.props.name,
            })
          : child
      })}
    </form>
  )
}
