"use client"

import AuthForm from '@/components/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth.action'
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
    onSubmit={signInWithCredentials}
  />
)

export default signIn
