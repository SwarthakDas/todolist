
import { useState,useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Hero = () => {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished,setShowFinished]=useState(true);

  useEffect(() => {
    let TodoString=localStorage.getItem("Todos");
    if(TodoString){
      let Todos=JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos);
    }
  }, [])
  

  const saveToLS=()=>{
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }

  const handleAdd=()=>{
    setTodos([...Todos,{id: uuidv4(), Todo,isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleEdit=(e,id)=>{
    let todo=Todos.filter(i=>i.id===id)
    setTodo(todo[0].Todo);
    let newTodos=Todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos);
    saveToLS()
  }
  const handleDelete=(e,id)=>{
    let newTodos=Todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos);
    saveToLS()
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheck=(e)=>{
    let id=e.target.name;
    let index=Todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...Todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const ToggleFinished=()=>{
    setShowFinished(!showFinished)
  }

  return (
    <div className="mx-3 my-3 ">
       
<form className="mb-3 w-full xl:items-center xl:justify-center xl:px-96 xl:pt-20"> 
  <p className="text-center text-3xl font-bold pb-16 text-orange-600 hidden xl:block">DoTask - Manage your Tasks at one place</p>  
  <p className=" text-xl font-bold pb-2 text-orange-600">Add a Task</p>  
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-orange-300 rounded-xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-100 dark:border-orange-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-orange-500 dark:focus:border-orange-500" onChange={handleChange} value={Todo} placeholder="Your Task" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800" onClick={handleAdd} disabled={Todo.length<=2}>Save</button>
    </div>
</form>
      <div className="bg-orange-100 pb-5 rounded-xl p-3 xl:mb-20 xl:mx-96 xl:px-5">
      <input onChange={ToggleFinished} checked={showFinished} type="checkbox" className="mr-2" />Show finished
      <div className="h-[1px] bg-black opacity-20 mt-3 mx-6"></div>
        <h1 className="text-blue-900 text-xl font-bold pt-2">Your Todo</h1>
        {Todos.length===0 && <div className="font-semibold">No todos to display</div>}
        {Todos.map(e=>{
          return (showFinished || !e.isCompleted) && <div key={e.id}>
        <div className="flex items-center my-2 text-xl font-semibold">
          <input name={e.id} type="checkbox" checked={e.isCompleted} className="mr-2 mt-1" onChange={handleCheck}/>
          <p className={e.isCompleted?"line-through":""}>{e.Todo}</p>
          <button className="bg-orange-500 rounded-xl py-2 px-3 ml-auto font-medium text-white text-base" onClick={(a)=>handleEdit(a,e.id)}>{<FaEdit></FaEdit>}</button>
          <button className="bg-orange-500 rounded-xl py-2 px-3  mx-2 font-medium text-white right-0 text-base" onClick={(a)=>handleDelete(a,e.id)}>{<MdDelete />}</button>
        </div>
        </div>
        })}
      </div>
    </div>
  )
}

export default Hero