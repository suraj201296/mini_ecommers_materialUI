import { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'

type userType = {
    state : {
        name : string
    }
}

export default function Dashboard() {

    const [ user , setUser] = useState();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if(storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.name);
        }
    }, [])

  return (
    <div> 
        <h3>Dashboard</h3>
        <span>{user}</span>
    </div>
  )
}