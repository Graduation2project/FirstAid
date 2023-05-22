import { useState, createContext, useContext } from "react"
import axios from "axios"
import my_axios from "../my_axios"

const MyContext = createContext({})

export const useMyContext = () => useContext(MyContext)
export const Context = ({children}) => {
    

    const [Data, setData] = useState();
 

    const [userData2,SetUser] = useState({})
  

    const login = async (email , password) => {

        try {
            const reponse = await axios.post(my_axios+"/auth/login" , {
                email: email,
                password: password
            })
            const resulst = reponse.data
            SetUser(resulst)
       
            return resulst
        } catch (error) {
            console.log(error)
        }
    
    }

    const GetRequests = async  () => {
          
            let userData = userData2
            const res = await axios.get(my_axios+"/ev2")
            const Visibility = await axios.post(my_axios+"/ev2/visibility" , {
            
                userID: userData.userID
            })

          

            var results = {
                data : res.data,
                visibility : Visibility.data
            }

            SetUser(userData)
            setData(results)
            
            return results
    
        
    }

    

    const ChangeStatus = async  (id , code ) => {
  
        const res = await axios.patch(my_axios+`/EV2/status/${id}`,{
            
            userID : userData2.userID,
            newStatus: code
            
          })
        //   const requests = await axios.get(my_axios+"/ev2")

        // var new_data = {data: [...requests.data] }
        // new_data.visibility = res.data

        setData(res.data)
        return 

    
}


const GetOneEm = async  (id ) => {
  
    const res = await axios.get(my_axios+`/EV2/get/${id}`)
    return res.data 


}

    const getData = () => Data
    const getUserData = () => userData2
    
    return(
        <MyContext.Provider value={{getData , setData , GetRequests,ChangeStatus , login , getUserData , GetOneEm}} >
            {children}

        </MyContext.Provider>
    )   
}