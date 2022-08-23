import classNames from 'classnames'

export interface IFooterProperties {
  children: any
  className?: string
}

export function Footer(props: IFooterProperties) {
  return (
    <footer className={classNames('header')}>
      <div className={classNames('header__content ', props.className)}>
        {props.children}
      </div>
    </footer>
  )
}
