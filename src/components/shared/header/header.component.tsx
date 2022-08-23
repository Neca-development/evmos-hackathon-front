import styles from '@components/shared/header/header.module.scss'

export interface IHeaderProperties {}

export default function Header(props: IHeaderProperties): JSX.Element {
  return <header className={styles.header}></header>
}
