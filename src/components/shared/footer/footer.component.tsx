import styles from '@components/shared/footer/footer.module.scss'

export interface IFooterProperties {}

export default function Footer(props: IFooterProperties): JSX.Element {
  return <footer className={styles.footer}></footer>
}
