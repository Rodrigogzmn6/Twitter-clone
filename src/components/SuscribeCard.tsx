import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

export const SuscribeCard = () => {
  return (
    <Card>
        <CardHeader>
          <h2 className='font-bold text-xl'>Suscribe to Premium</h2>
        </CardHeader>
        <CardBody>
          <p className='text-base'>
            Suscribe to unlock new features and, if you are elegible, receive an ad revenue share payment.
          </p>
        </CardBody>
        <CardFooter>
          <Button radius='full' color='primary'><p className='font-bold text-base'>Suscribe</p></Button>
        </CardFooter>
      </Card>
  )
}
