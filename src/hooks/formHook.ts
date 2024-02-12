import { useState, type SetStateAction } from 'react'

export const useFormHook = () => {
  const [signUpModal, setSignUpModal] = useState(false)
  const [logInModal, setLogInModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event: { target: { value: SetStateAction<string> } }) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPassword(event.target.value)
  }

  return { signUpModal, setSignUpModal, logInModal, setLogInModal, handleEmailChange, handlePasswordChange, email, password }
}
