import classNames from 'classnames'
import * as React from 'react'

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
        'flex justify-center items-center bg-[#D9D9D9] cursor-pointer',
        size === 'small' && 'h-[7rem] w-[7rem]',
        size === 'large' && 'h-[20rem] w-[20rem]'
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
        <img src="/assets/images/add.svg" alt="" className="h-1/6 w-1/6" />
      )}
    </label>
  )
}
