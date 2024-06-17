import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useLogin from "@/hooks/useLogin"
import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  }


  return (
    <Card className="w-[350px]">
        <CardHeader className="items-center">
            <CardTitle>Chat-App</CardTitle>
            <CardDescription>This is a login page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm}>
            <div className="grid w-full gap-4">
                <div className="flex flex-col items-start space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input type="username" placeholder="username" 
                    value={inputs.username}
                    onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                  />
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="password" 
                      value={inputs.password}
                      onChange={(e)=> setInputs({...inputs, password: e.target.value})}
                    />
                </div>
                  <Button className="w-full" disabled={loading}>{loading ? "Loading..." : "Login"}</Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Not Register yet?
                    </span>
                  </div>
                </div>
              </div>
            </form>
        </CardContent>
        <CardFooter>
            <Link className="w-full" to={"/signup"}>
            <Button className="w-full bg-blue-500 dark:text-white hover:bg-blue-600">Signup</Button>
            </Link>
        </CardFooter>
    </Card>
  )
}

export default Login