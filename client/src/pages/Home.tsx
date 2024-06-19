import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
        <div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[650px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-2'>
            <Sidebar />
            <MessageContainer />
        </div>
  )
}

export default Home