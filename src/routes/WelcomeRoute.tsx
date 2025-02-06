import { Button, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useFormHook } from '../hooks/formHook'
import { AppleIcon, GoogleIcon, XIcon } from '../icons/Icons'
import { useFirebaseStore } from '../stores/firebaseStore'
import { useUsersStore } from '../stores/usersStore'
import './WelcomeRoute.css'

export const WelcomeRoute = () => {
  const app = useFirebaseStore(state => state.app)
  const createUserWithEmail = useUsersStore(state => state.createUserWithEmail)
  const createUserWithGoogle = useUsersStore(state => state.createUserWithGoogle)
  const loginWithEmail = useUsersStore(state => state.loginWithEmail)
  const error = useUsersStore(state => state.error)
  const restoreError = useUsersStore(state => state.restoreError)
  const { signUpModal, setSignUpModal, logInModal, setLogInModal, handleEmailChange, handlePasswordChange, email, password } = useFormHook()

  const handleCreateAccountGoogle = async () => {
    await createUserWithGoogle(app)
  }

  const handleCreateAccount = async (email: string, password: string) => {
    await createUserWithEmail(app, email, password)
  }

  const handleSignIn = async (email: string, password: string) => {
    await loginWithEmail(app, email, password)
  }

  return (
    <main className='wr twitterTheme text-primary-text bg-background flex flex-col gap-3 items-start min-h-screen p-9
    lg:flex-row lg:items-center'>
      <div className='w-10
        lg:w-2/5 lg:grid lg:place-items-center'>
        <XIcon/>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='font-bold py-10 text-4xl
          sm:text-7xl'
        >Happening now</h1>
        <h3 className='text-xl font-bold'>Join Today.</h3>
        <div className='flex flex-col gap-4 w-3/4 justify-stretch'>
          <Button startContent={<GoogleIcon/>} radius='full' className='h-min bg-primary-text py-1 flex' onClick={handleCreateAccountGoogle}>
            <p className='text-secondary-text font-bold'>Sign Up with Google</p>
          </Button>
          <Button startContent={<AppleIcon/>} radius='full' className='h-min bg-primary-text py-1'>
            <p className='text-secondary-text font-bold'>Sign Up with Apple</p>
          </Button>
          <div className='flex items-center gap-2'>
            <Divider className='shrink'/> or <Divider className='shrink'/>
          </div>
          <Button color='primary' radius='full' className='h-min py-3' onPress={() => { setSignUpModal(!signUpModal) }}>
            <p className='font-bold'>Create account</p>
          </Button>
          <Modal
            isOpen={signUpModal}
            onOpenChange={() => { setSignUpModal(!signUpModal) }}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Create your account</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      onChange={handleEmailChange}
                    />
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      onChange={handlePasswordChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={() => {
                      onClose()
                      handleCreateAccount(email, password)
                    }}>
                      Sign Up
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <p className='text-xs'>
            By signing up, you agree to the <Link href='#' className='text-xs'>Terms of Service</Link> and <Link href='#' className='text-xs'>Privacy Policy</Link>, including <Link href='#' className='text-xs'>Cookie Use</Link>.
          </p>
        </div>
        <div className='flex flex-col gap-2 py-10 w-3/4'>
          <h5 className='font-bold'>Already have an account?</h5>
          <Button className='bg-black border border-solid border-secondary-text' radius='full' onPress={() => { setLogInModal(!logInModal) }}>
            <p className='text-primary font-bold'>Sign In</p>
          </Button>
          <Modal
            isOpen={logInModal}
            onOpenChange={() => { setLogInModal(!logInModal) }}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Log into your account</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      onChange={handleEmailChange}
                    />
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      onChange={handlePasswordChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={() => {
                      onClose()
                      handleSignIn(email, password)
                    }}>
                      Log In
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Modal
          isOpen={error != null}
          onOpenChange={() => { restoreError() }}
          placement="top-center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Ups! Something went wrong</ModalHeader>
            <ModalBody>
              <h2>{error}</h2>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </main>
  )
}
