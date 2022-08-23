import { fileToBlob } from '@shared/utils'
import * as React from 'react'

import { AttachIcon } from './icons'

export interface IFileInputProperties {
  onChange: Function
}

export function FileInput({ onChange }: IFileInputProperties) {
  const handleFileInputChange = async (el: React.ChangeEvent<HTMLInputElement>) => {
    console.log(el)
    if (el.target.files) {
      const blobArray = await Promise.all(
        Array.from(el.target.files).map(async (file) => {
          return fileToBlob(file)
        })
      ).then((res) => res)

      onChange(blobArray)
    }
  }
  return (
    <label>
      <input
        className="hidden"
        multiple={true}
        type={'file'}
        accept="image/*"
        onChange={handleFileInputChange}
      />
      <AttachIcon />
    </label>
  )
}
