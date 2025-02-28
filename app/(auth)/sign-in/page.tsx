"use client"

import AuthForm from '@/components/AuthForm'
import { signInWithCeredentials } from '@/lib/actions/auth.action'
import { signInSchema } from '@/lib/valiations'
import React from 'react'

const signIn = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCeredentials}
  />
)

export default signIn
