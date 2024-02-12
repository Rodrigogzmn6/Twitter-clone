/* eslint-disable react/no-unescaped-entities */
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useEffect } from 'react'
import { DotsIcon } from '../icons/Icons'
import { useTrendsStore } from '../stores/trendsStore'

export const TrendsCard = () => {
  const trends = useTrendsStore(state => state.trends)
  const fetchTrends = useTrendsStore(state => state.fetchTrends)

  useEffect(() => {
    void fetchTrends()
  }, [])

  return (
    <Card>
        <CardHeader className='justify-center'>
          <h2 className='font-bold text-xl'>What's going on</h2>
        </CardHeader>
        {trends.map(trend => {
          return (
            <CardBody key={trend.key} className='cursor-pointer flex-row justify-between items-top hover:bg-light-bg'>
                <div className='flex flex-col'>
                  <p className='font-thin text-secondary-text text-sm'>{trend.where}</p>
                  <h2 className='font-semibold text-medium'>{trend.name}</h2>
                  <p className='font-thin text-secondary-text  text-sm'>{trend.posts}</p>
                </div>
                <Button isIconOnly radius='full' className='p-1 bg-transparent w-min h-min min-w-min hover:bg-primary-background'>
                  <DotsIcon width={20} height={20}/>
                </Button>
            </CardBody>
          )
        })}
        <CardFooter className='hover:bg-light-bg cursor-pointer'>
          <Button variant='light' color='primary' className='data-[hover=true]:bg-transparent'><p className='font-light'>Show more...</p></Button>
        </CardFooter>
      </Card>
  )
}
