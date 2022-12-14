interface IEthereumIconProperties {
  className?: string
}

export const EthereumIcon = ({ className }: IEthereumIconProperties) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_73_5360)">
      <path
        d="M7.99846 0L7.89111 0.364618V10.9441L7.99846 11.0512L12.9092 8.14836L7.99846 0Z"
        fill="#D6D6D6"
      />
      <path d="M7.99854 0L3.08765 8.14836L7.99854 11.0512V5.91619V0Z" fill="white" />
      <path
        d="M7.99849 11.9809L7.93799 12.0547V15.8233L7.99849 15.9999L12.9123 9.07965L7.99849 11.9809Z"
        fill="#D2D2D2"
      />
      <path d="M7.99854 15.9999V11.9809L3.08765 9.07965L7.99854 15.9999Z" fill="white" />
      <path d="M7.99854 11.0512L12.9093 8.14838L7.99854 5.9162V11.0512Z" fill="#9D9D9D" />
      <path d="M3.08765 8.14838L7.99854 11.0512V5.9162L3.08765 8.14838Z" fill="#989898" />
    </g>
    <defs>
      <clipPath id="clip0_73_5360">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
