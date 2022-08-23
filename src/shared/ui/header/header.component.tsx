import classNames from 'classnames'

export interface IHeaderProperties {
  children: any
  className?: string
}

export function Header(props: IHeaderProperties) {
  return (
    <header className={classNames('header')}>
      <div className={classNames('header__content ', props.className)}>
        {props.children}
      </div>
    </header>
  )
}
