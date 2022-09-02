import { Paper } from '@mui/material'
import { HeadingOne, MButton, Paragraph, WebIcon } from '@shared/ui'

interface IDaoHeroProperties {
  image: string | undefined
  name: string | undefined
  description: string | undefined
  onInvite: (event: any) => any
}

export function DaoHero(props: IDaoHeroProperties) {
  const { image, name, description, onInvite } = props

  return (
    <Paper className="min-h-[13rem] mb-10 p-8 space-x-12 flex text-white bg-dao-hero">
      {/* DAO image */}
      <div>
        <div className="h-[7rem] w-[7rem] flex justify-center items-center bg-[#D9D9D9]">
          <img src={image} alt="" className="w-full" />
        </div>
      </div>
      {/* /DAO image */}

      {/* DAO info */}
      <div className="w-full">
        <div className="flex justify-between">
          <HeadingOne className="mb-1">{name}</HeadingOne>
          <MButton>
            <label className="cursor-pointer">
              Invite users
              <input hidden type={'file'} onChange={onInvite} />
            </label>
          </MButton>
        </div>

        <div className="mb-10 space-x-1 flex items-center cursor-pointer">
          <WebIcon />
          <div className="font-bold text-orange">
            <Paragraph>Smart contract</Paragraph>
            <div className="h-[1px] w-full bg-orange" />
          </div>
        </div>

        <Paragraph>{description}</Paragraph>
      </div>
      {/* /DAO info */}
    </Paper>
  )
}
