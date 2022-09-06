import { useModal } from '@shared/lib'
import { FileInput, HeadingTwo, MButton, MTextField, Paragraph } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import * as React from 'react'

import { useCreateDao, useDaoForm } from '../lib'

export function CreateDaoForm() {
  const { account } = useEthers()
  const { daoForm, handleImageChange, handleTextChange } = useDaoForm()

  const daoFormFieldsValues = Object.values(daoForm)
  const isCreateButtonDisabled = daoFormFieldsValues.some((fieldValue) => !fieldValue)

  const { createDao } = useCreateDao(daoForm, account)

  const { setIsModalOpen } = useModal()

  const handleClickOnCreateButton = () => {
    setIsModalOpen(true)
    createDao()
  }

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
        <div className="col-span-3 flex flex-col justify-between space-y-4">
          <MTextField
            name="name"
            label="DAO Name"
            className="w-3/4"
            onChange={handleTextChange}
          />

          <MTextField
            name="description"
            label="DAO Description"
            className="w-3/4"
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
        <MButton disabled={isCreateButtonDisabled} onClick={handleClickOnCreateButton}>
          Create
        </MButton>
      </div>
      {/* /Create button */}
    </>
  )
}
