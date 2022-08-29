import { DaoApi } from '@entities/dao'
import { TextField } from '@mui/material'
import { FileInput, HeadingTwo, MButton, Paragraph } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import * as React from 'react'
import { useCreateDao } from 'src/blockchain'

import { useGenerateDaoInfoLink, useUploadNfts } from '../model'

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
  tokenSymbol: 'TEST',
  daoImage: null,
  firstNftImage: null,
  secondNftImage: null,
  thirdNftImage: null,
}

export function CreateDaoForm() {
  const [daoForm, setDaoForm] = React.useState<IDaoFormProperties>(daoFormInitialState)

  const { account } = useEthers()

  const [createDaoOnBackend] = DaoApi.useCreateDaoMutation()

  const { getImageLinks } = useUploadNfts()
  const { daoInfoLink, getDaoInfoLink } = useGenerateDaoInfoLink()

  const { daoContractAddress, createDao } = useCreateDao()

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDaoForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleImageChange = (name: string, newImage: File | null | undefined) => {
    setDaoForm((previous) => ({ ...previous, [name]: newImage }))
  }

  const handleClickOnCreateButton = async () => {
    try {
      const imagesFiles = {
        daoImage: daoForm.daoImage,
        firstNftImage: daoForm.firstNftImage,
        secondNftImage: daoForm.secondNftImage,
        thirdNftImage: daoForm.thirdNftImage,
      }
      const imageLinks = await getImageLinks(imagesFiles)

      const daoInfo = {
        name: daoForm.name,
        description: daoForm.description,
        imageLinks,
      }
      await getDaoInfoLink(daoInfo)

      await createDao(daoForm.name, daoForm.tokenSymbol, daoInfoLink)
    } catch (error: any) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (account && daoInfoLink && daoContractAddress) {
      console.log('dao contract address:', daoContractAddress)
      console.log('dao info link:', daoInfoLink)
      console.log('user wallet address:', daoContractAddress)
      createDaoOnBackend({
        contractAddress: daoContractAddress,
        ipfsUrl: daoInfoLink,
        userAddress: account,
      })
    }
  }, [account, daoInfoLink, daoContractAddress])

  return (
    <>
      <div className="mb-7 grid grid-cols-5 gap-x-10">
        {/* Dao image */}
        <div className="col-span-2">
          <FileInput
            inputName="daoImage"
            imgFile={daoForm.daoImage}
            onImageChange={handleImageChange}
          />
        </div>
        {/* /Dao image */}

        {/* Dao form */}
        <div className="col-span-3 w-[70%] flex flex-col justify-between space-y-4">
          <TextField
            InputLabelProps={{ className: 'text-xs text-white' }}
            InputProps={{ className: 'text-xs text-white focus:border-orange' }}
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
            <HeadingTwo className="mb-2 text-base">Add tokens</HeadingTwo>

            <div className="grid grid-cols-5 gap-x-5">
              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="firstNftImage"
                  imgFile={daoForm.firstNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>1 vote</Paragraph>
              </div>

              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="secondNftImage"
                  imgFile={daoForm.secondNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>2 vote</Paragraph>
              </div>

              <div className="space-y-1 flex flex-col justify-center items-center">
                <FileInput
                  inputName="thirdNftImage"
                  imgFile={daoForm.thirdNftImage}
                  onImageChange={handleImageChange}
                />
                <Paragraph>3 vote</Paragraph>
              </div>
            </div>
          </div>
          {/* /Tokens images */}
        </div>
        {/* /Dao form */}
      </div>

      {/* Create button */}
      <div className="flex justify-center">
        <MButton onClick={handleClickOnCreateButton}>Create</MButton>
      </div>
      {/* /Create button */}
    </>
  )
}
