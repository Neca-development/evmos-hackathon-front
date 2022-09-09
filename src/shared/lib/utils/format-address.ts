export const formatAddress = (address: string): string => {
  return `${address?.slice(0, 4)}...${address?.slice(-6, address?.length)}`
}
