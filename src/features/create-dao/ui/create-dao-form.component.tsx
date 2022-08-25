// import { DaoApi } from '@entities/dao'
import { Button, TextField } from '@mui/material'
import { FileInput, HeadingTwo } from '@shared/ui'
import * as React from 'react'
// import { useCreateDao } from 'src/blockchain'

interface IDaoFormProperties {
  name: string
  description: string
  tokenSymbol: string
  daoImage: File | null | undefined
  firstNftImage: File | null | undefined
  secondNftImage: File | null | undefined
  thirdNftImage: File | null | undefined
}

const daoFormInitialState: IDaoFormProperties = {
  name: '',
  description: '',
  tokenSymbol: '',
  daoImage: null,
  firstNftImage: null,
  secondNftImage: null,
  thirdNftImage: null,
}

export function CreateDaoForm() {
  const [daoForm, setDaoForm] = React.useState<IDaoFormProperties>(daoFormInitialState)

  // const [generateImageLinks] = DaoApi.useUploadNftsMutation()
  // const [generateDaoInfoLink] = DaoApi.useGenerateDaoInfoLinkMutation()

  // const { createDao } = useCreateDao()

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDaoForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleImageChange = (name: string, newImage: File | null | undefined) => {
    setDaoForm((previous) => ({ ...previous, [name]: newImage }))
  }

  // const handleClickOnCreateButton = async () => {
  //   console.log('generate token img links')
  //   const imageLinks = await generateImageLinks({ test: 'test' })
  //   console.log('image links:', imageLinks)

  //   console.log('generate dao info link')
  //   const daoInfoLink = await generateDaoInfoLink({ test: 'test' })
  //   console.log('dao info link:', daoInfoLink)

  //   console.log('create dao on sc')
  //   await createDao(daoForm.name, daoForm.tokenSymbol, 'test', 'test', 'test')
  // }

  return (
    <div className="space-x-5 flex justify-between">
      {/* Dao image */}
      <div>
        <FileInput
          size="large"
          inputName="daoImage"
          imgFile={daoForm.daoImage}
          onImageChange={handleImageChange}
        />
      </div>
      {/* /Dao image */}

      {/* Dao form */}
      <div className="flex flex-col justify-between space-y-3">
        <TextField
          InputLabelProps={{ className: 'text-xs text-white' }}
          InputProps={{ className: 'text-xs text-white' }}
          name="name"
          label="DAO Name"
          onChange={handleTextChange}
        />

        <TextField
          InputLabelProps={{ className: 'text-xs text-white' }}
          InputProps={{ className: 'text-xs text-white' }}
          name="description"
          label="DAO Description"
          multiline
          minRows={6}
          onChange={handleTextChange}
        />

        {/* Tokens images */}
        <div>
          <HeadingTwo className="mb-1 text-base">Add tokens</HeadingTwo>

          <div className="flex space-x-5">
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
          </div>
        </div>
        {/* /Tokens images */}
      </div>
      {/* /Dao form */}

      {/* Create button */}
      <div className="self-end">
        <Button
          variant="contained"
          size="small"
          className="text-[0.65rem] text-white bg-orange"
          // onClick={handleClickOnCreateButton}
        >
          Create
        </Button>
      </div>
      {/* /Create button */}
    </div>
  )
}
