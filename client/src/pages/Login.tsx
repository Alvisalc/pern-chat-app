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


const Login = () => {
  return (
    <Card className="w-[350px]">
        <CardHeader className="items-center">
            <CardTitle>Chat-App</CardTitle>
            <CardDescription>This is a login page.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full gap-4">
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="username" placeholder="username" />
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="password" />
                </div>
                <Button className="w-full">Login</Button>
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
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-blue-500 dark:text-white hover:bg-blue-600">Signup</Button>
        </CardFooter>
    </Card>
  )
}

export default Login