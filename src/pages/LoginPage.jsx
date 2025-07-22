import LoginForm from "../components/content/LoginForm"
import LoginImage from "../components/content/LoginImage"

export default function LoginPage(){
  return (
    <div className="w-full h-full md:flex md:gap-8">
      <LoginForm/>
      <LoginImage/>
    </div>
  )
}