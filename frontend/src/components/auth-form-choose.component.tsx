import { useState } from "react";

import SignUpForm from "./signup-form.component";
import LoginForm from "./login-form.component";

const AuthFormChoose = () => {
  const [form, setForm] = useState("sign-up");

  return (
    form === "sign-up" ? <SignUpForm changeForm={setForm} /> : <LoginForm changeForm={setForm} />
  )
}

export default AuthFormChoose