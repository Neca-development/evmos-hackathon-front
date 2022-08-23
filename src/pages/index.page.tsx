import { Container, TextField } from '@mui/material'
import { Header } from '@shared/ui'
import { Footer } from '@shared/ui/footer'

export default function HomePage() {
  return (
    <>
      <Header>Header</Header>

      <Container>
        <TextField label="DAO name" variant="outlined" />
        <TextField multiline label="DAO description" variant="outlined" />
      </Container>

      <Footer>Footer</Footer>
    </>
  )
}
