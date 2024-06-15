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


const SignUp = () => {


    const [selectedGender, setSelectedGender] = useState<"male" | "female" | "">("");

    const handleGenderChange = (gender: "male" | "female") => {
        setSelectedGender(gender);
    };

  return (
    <Card className="w-[350px]">
        <CardHeader className="items-center">
            <CardTitle>Chat-App</CardTitle>
            <CardDescription>SignUp to explore our app.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full gap-4">
                {/* Full Name */}
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" type="text" placeholder="happy admin" />
                </div>
                {/* Username */}
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="username" placeholder="username" />
                </div>
                {/* Password */}
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="password" />
                </div>
                {/* Confirm password */}
                <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                    <Input id="password" type="confirm password" placeholder="password" />
                </div>
                {/* Gender */}
                <div className="flex flex-col items-start space-y-2">
                <GenderCheckbox selectedGender={selectedGender} onCheckboxChange={handleGenderChange} />
                </div>
                <Button className="w-full">Signup</Button>
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
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-blue-500 dark:text-white hover:bg-blue-600">Back to Login</Button>
        </CardFooter>
    </Card>
  )
}

export default SignUp