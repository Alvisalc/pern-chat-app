import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";

const LogoutButton = () => {
	const {logout} = useLogout();

	return (
		<Button className="dark:bg-background dark:text-white border bg-white text-black hover:bg-gray-200">
			<LogOut onClick={logout} />
		</Button>
	);
};
export default LogoutButton;
