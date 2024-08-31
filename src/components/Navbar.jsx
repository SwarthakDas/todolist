import { SiTask } from "react-icons/si";
const Navbar = () => {
  return (
    <div>
        <div className='flex justify-between items-center px-5 py-4 bg-orange-600 text-white md:px-10 md:py-8'>
            <h1 className="text-2xl font-bold">DoTask</h1>
            <p className=" font-medium text-3xl">{<SiTask/>}</p>
        </div>
    </div>
  )
}

export default Navbar
