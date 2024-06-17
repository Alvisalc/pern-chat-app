import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const LogoutButton = () => {
	const logout = () => {
		alert("You are logged out");
	};

	return (
		<Button className="dark:bg-background dark:text-white border bg-white text-black hover:bg-gray-200">
			<LogOut onClick={logout} />
		</Button>
	);
};
export default LogoutButton;
