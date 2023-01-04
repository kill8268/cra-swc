import React from 'react'
import md5 from 'blueimp-md5'
import supbase from '@lib/supbase'
import { useForm } from "react-hook-form"
import { useToast, FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react'

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const toast = useToast({position: 'top'})

  const [isLoading, setIsLoading] = React.useState(false)

  const validation = {
    required: true,
    minLength: 8,
    maxLength: 40
  }

  const onSubmit = async data => {
    setIsLoading(true)
    const { error } = await supbase.auth.signUp({
      ...data,
      password: md5(data.password, process.env.REACT_APP_KEY)
    })
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setIsLoading(false) 
      return
    }
    toast({
      title: 'success',
      description: '注册成功',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    window.location.href = '/sign-in'
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel>邮箱(8-40)</FormLabel>
          <Input type='email' {...register("email", validation)} />
          {errors.email && <FormErrorMessage>请填写邮箱</FormErrorMessage>} 
        </FormControl>
        <FormControl isRequired isInvalid={errors.password}>
          <FormLabel>密码(8-40)</FormLabel>
          <Input type='password' {...register("password", validation)} />
          {errors.password && <FormErrorMessage>请填写密码</FormErrorMessage>} 
        </FormControl>
        <FormControl isRequired isInvalid={errors.passwor2}>
          <FormLabel>确认密码(8-40)</FormLabel>
          <Input type='password' {...register("password2", {
            ...validation,
            validate: { checekPassword: value => value === watch('password') }
          })} />
          {errors.password && <FormErrorMessage>请确认密码</FormErrorMessage>} 
        </FormControl>
        <Button isLoading={isLoading} className='w-full' colorScheme='blue' type='submit'>注册</Button>
      </form>
    </div>
  )
}