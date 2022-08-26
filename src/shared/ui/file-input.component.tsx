import classNames from 'classnames'
import * as React from 'react'

import { AddIcon } from './icons'

export interface IFileInputProperties {
  size?: 'small' | 'large'
  inputName: string
  imgFile: File | null | undefined
  onImageChange: (name: string, newImage: File | null | undefined) => void
}

export function FileInput(props: IFileInputProperties) {
  const { inputName, imgFile, size = 'small', onImageChange } = props

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (!files) return

    const newImage = files[0]

    onImageChange(name, newImage)
  }

  return (
    <label
      className={classNames(
        'flex justify-center items-center bg-[rgba(255, 255, 255, 0.08)] cursor-pointer',
        size === 'small' && 'aspect-square w-1/2',
        size === 'large' && 'aspect-square w-[70%]'
      )}
    >
      <input
        name={inputName}
        hidden
        type={'file'}
        accept="image/*"
        onChange={handleFileInputChange}
      />

      {imgFile ? (
        <img src={URL.createObjectURL(imgFile)} alt="" className="w-full" />
      ) : (
        <>
          <img
            src="/assets/images/image-placeholder.png"
            alt="Upload image"
            className="w-full"
          />
          <AddIcon className="h-1/6 w-1/6 hidden hover:block" />
        </>
      )}
    </label>
  )
}
