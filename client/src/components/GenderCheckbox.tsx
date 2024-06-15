import { Label } from "./ui/label";

const GenderCheckbox = ({
	selectedGender,
	onCheckboxChange,
}: {
	selectedGender: string;
	onCheckboxChange: (gender: "male" | "female") => void;
}) => {
	return (
		<>
			<Label htmlFor="gender">Gender</Label>
			<div className="flex space-x-4">
				<div className="flex items-center space-x-2">
					<input type="Checkbox" checked={selectedGender === "male"} onChange={()=> onCheckboxChange("male")}/>
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Male
					</label>
				</div>
				<div className="flex items-center space-x-2">
					<input type="Checkbox" checked={selectedGender === "female"} onChange={()=> onCheckboxChange("female")} />
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Female
					</label>
				</div>
			</div>
		</>
	);
};
export default GenderCheckbox;
