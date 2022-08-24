import { Box, Button, TextField } from '@mui/material'
import {
  FileInput,
  Footer,
  Header,
  HeadingOne,
  HeadingTwo,
  MainContainer,
} from '@shared/ui'
import * as React from 'react'

interface IDaoFormProperties {
  name: string
  description: string
  daoImage: File | null | undefined
  firstNftImage: File | null | undefined
  secondNftImage: File | null | undefined
  thirdNftImage: File | null | undefined
}

const daoFormInitialState: IDaoFormProperties = {
  name: '',
  description: '',
  daoImage: null,
  firstNftImage: null,
  secondNftImage: null,
  thirdNftImage: null,
}

export default function CreateDaoPage() {
  const [daoForm, setDaoForm] = React.useState<IDaoFormProperties>(daoFormInitialState)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDaoForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleImageChange = (name: string, newImage: File | null | undefined) => {
    switch (name) {
      case 'daoImage':
      case 'firstNftImage':
      case 'secondNftImage':
      case 'thirdNftImage':
        setDaoForm((previous) => ({ ...previous, [name]: newImage }))
        break
      default:
        break
    }
  }

  return (
    <>
      <Header />

      <MainContainer>
        <HeadingOne className="mb-3">DAO creation</HeadingOne>

        <Box className="flex space-x-5">
          {/* Dao image */}
          <Box>
            <FileInput
              size="large"
              inputName="daoImage"
              imgFile={daoForm.daoImage}
              onImageChange={handleImageChange}
            />
          </Box>
          {/* /Dao image */}

          {/* Dao form */}
          <Box className="flex flex-col justify-between space-y-3">
            <TextField
              InputLabelProps={{ className: 'text-xs' }}
              InputProps={{ className: 'text-xs' }}
              name="name"
              label="DAO Name"
              onChange={handleTextChange}
            />

            <TextField
              InputLabelProps={{ className: 'text-xs' }}
              InputProps={{ className: 'text-xs' }}
              name="description"
              label="DAO Description"
              multiline
              minRows={6}
              onChange={handleTextChange}
            />

            {/* Tokens images */}
            <Box>
              <HeadingTwo className="mb-1 text-base">Add tokens</HeadingTwo>

              <Box className="flex space-x-5">
                <FileInput
                  inputName="firstNftImage"
                  imgFile={daoForm.firstNftImage}
                  onImageChange={handleImageChange}
                />

                <FileInput
                  inputName="secondNftImage"
                  imgFile={daoForm.secondNftImage}
                  onImageChange={handleImageChange}
                />

                <FileInput
                  inputName="thirdNftImage"
                  imgFile={daoForm.thirdNftImage}
                  onImageChange={handleImageChange}
                />
              </Box>
            </Box>
            {/* /Tokens images */}
          </Box>
          {/* /Dao form */}

          {/* Create button */}
          <Box className="self-end">
            <Button
              variant="contained"
              className="text-[0.65rem] text-white bg-[#333333] hover:bg-[#4e4e4e]"
            >
              Create
            </Button>
          </Box>
          {/* /Create button */}
        </Box>
      </MainContainer>
      <Footer />
    </>
  )
}
