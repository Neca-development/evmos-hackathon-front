interface ICheckIconProperties {
  className?: string
}

export const ErrorIcon = ({ className }: ICheckIconProperties) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 29 29"
    xmlSpace="preserve"
    className={className}
  >
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M9.197 19.803L19.803 9.197M9.197 9.197l10.606 10.606"
    />
  </svg>
)
