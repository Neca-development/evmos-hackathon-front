import iconTypes from './icon.constant'

interface IIconProperties {
  name: string
}

const Icon = ({ name, ...props }: IIconProperties): JSX.Element => {
  const IconComponent = iconTypes[name]

  return <IconComponent {...props} />
}

export default Icon
