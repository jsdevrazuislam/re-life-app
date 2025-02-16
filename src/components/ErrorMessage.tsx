import React from 'react'
import Paragraph from './ui/Paragraph'
import loginStyles from '../styles/login.style'

const ErrorMessage = ({ error } : { error:string}) => {
  return (
    <Paragraph style={loginStyles.errorMessage} level='Small' weight='SemiBold'>{error}</Paragraph>
  )
}

export default ErrorMessage