import { Paper, Skeleton } from '@mui/material'
import { HeadingOne, MButton, Paragraph, WebIcon } from '@shared/ui'

interface IDaoHeroProperties {
  image: string | undefined
  name: string | undefined
  description: string | undefined
  onInvite: (event: any) => any
}

export function DaoHero(props: IDaoHeroProperties) {
  const { image, name, description, onInvite } = props

  const isLoading = image == undefined || name == undefined || description == undefined

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" className="h-[13rem] mb-10 bg-light-gray" />
      ) : (
        <Paper className="min-h-[13rem] mb-10 p-8 space-x-12 flex text-white bg-dao-hero">
          {/* DAO image */}
          <div>
            <div className="h-[7rem] w-[7rem] flex justify-center items-center">
              <img src={image} alt="" className="w-full" />
            </div>
          </div>
          {/* /DAO image */}

          {/* DAO info */}
          <div className="w-full">
            <div className="grid grid-cols-3 gap-x-5">
              <HeadingOne className="col-span-2 mb-1">{name}</HeadingOne>

              <div>
                <MButton>
                  <label className="cursor-pointer">
                    Invite users
                    <input hidden type={'file'} onChange={onInvite} />
                  </label>
                </MButton>
              </div>
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
      )}
    </>
  )
}
