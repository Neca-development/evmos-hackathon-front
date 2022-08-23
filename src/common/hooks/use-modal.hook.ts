import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    toggle,
  }
}

export default useModal
