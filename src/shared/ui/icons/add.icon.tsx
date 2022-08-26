interface IAddIconProperties {
  className?: string
}

export const AddIcon = ({ className }: IAddIconProperties) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="7.0542"
      y="0.117188"
      width="1.26126"
      height="15.1351"
      rx="0.630631"
      fill="#D33D00"
    />
    <rect
      x="0.117188"
      y="8.31445"
      width="1.26126"
      height="15.1351"
      rx="0.630631"
      transform="rotate(-90 0.117188 8.31445)"
      fill="#D33D00"
    />
  </svg>
)
