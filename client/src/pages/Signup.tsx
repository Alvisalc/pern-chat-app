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
import GenderCheckbox from "@/components/GenderCheckbox"
import { useState } from "react"
import { Link } from "react-router-dom"
import useSignup from "@/hooks/useSignup"


const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    })
    
    const {loading, signup} = useSignup();

    const handleGenderChange = (gender: "male" | "female") => {
        setInputs({...inputs, gender});
    };

    const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		signup(inputs);
	};

  return (
    <Card className="w-[350px]">
        <CardHeader className="items-center">
            <CardTitle>Chat-App</CardTitle>
            <CardDescription>SignUp to explore our app.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmitForm}>
                <div className="grid w-full gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input type="text" placeholder="happy admin" 
                            value={inputs.fullName}
                            onChange={(e)=> setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>
                    {/* Username */}
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input type="username" placeholder="username" 
                            value={inputs.username}
                            onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                        />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" placeholder="password" 
                            value={inputs.password}
                            onChange={(e)=> setInputs({...inputs, password: e.target.value})}
                        />
                    </div>
                    {/* Confirm password */}
                    <div className="flex flex-col items-start space-y-2">
                        <Label htmlFor="confirmpassword">Confirm Password</Label>
                        <Input type="confirm password" placeholder="confirm password" 
                            value={inputs.confirmPassword}
                            onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>
                    {/* Gender */}
                    <div className="flex flex-col items-start space-y-2">
                        <GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleGenderChange} />
                    </div>
                    <Button className="w-full" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Already have an account?
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter>
            <Link className="w-full" to={"/login"}>
                <Button className="w-full bg-blue-500 dark:text-white hover:bg-blue-600">Back to Login</Button>
            </Link>
        </CardFooter>
    </Card>
  )
}

export default SignUp