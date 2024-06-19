import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r-2  md:p-4 flex flex-col w-44 md:w-1/2'>
			<SearchInput />
			<div className='px-3 pb-2' />
			<Conversations />
		</div>
	);
};
export default Sidebar;
