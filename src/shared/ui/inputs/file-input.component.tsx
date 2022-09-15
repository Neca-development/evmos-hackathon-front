import classNames from 'classnames'
import * as React from 'react'

import { AddIcon } from '../icons'

export interface IFileInputProperties {
  inputName: string
  imgFile: File | null | undefined
  onImageChange: (name: string, newImage: File | null | undefined) => void
}

export function FileInput(props: IFileInputProperties) {
  const { inputName, imgFile, onImageChange } = props

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (!files) return

    const newImage = files[0]

    onImageChange(name, newImage)
  }

  return (
    <label
      className={classNames(
        'aspect-square cursor-pointer',
        'relative flex justify-center items-center',
        'hover:ring-2 hover:ring-orange transition-all',
        'rounded-md bg-[rgba(255, 255, 255, 0.08)]'
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
        <img
          src="/assets/images/image-placeholder.png"
          alt="Upload image"
          className="w-full rounded-md"
        />
      )}

      <div
        className={classNames(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'h-full w-full',
          'flex justify-center items-center',
          'opacity-0 hover:opacity-100 transition-all',
          'bg-[rgba(0,0,0,0.25)]'
        )}
      >
        <AddIcon className="h-1/5 w-1/5" />
      </div>
    </label>
  )
}
