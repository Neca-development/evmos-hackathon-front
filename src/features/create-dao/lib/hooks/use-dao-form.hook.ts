import type { IDaoForm } from '@features/create-dao/model'
import * as React from 'react'

import { INITIAL_STATE } from '../constants'

export const useDaoForm = () => {
  const [daoForm, setDaoForm] = React.useState<IDaoForm>(INITIAL_STATE)

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDaoForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleImageChange = (name: string, newImage: File | null | undefined) => {
    setDaoForm((previous) => ({ ...previous, [name]: newImage }))
  }

  return { daoForm, handleTextChange, handleImageChange }
}
