"use client"

import AuthForm from "@/components/AuthForm"
import { signUpSchema } from "@/lib/valiations"
import { signUp } from '@/lib/actions/auth.action'


const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      password: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={signUp}
  />
)

export default page
