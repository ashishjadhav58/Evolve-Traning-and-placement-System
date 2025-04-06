import React, { useEffect } from 'react'

export default function Tp() {
    useEffect(()=>{
        const show = async ()=>{
            try{
                const response = await axios.get("http://localhost:3000/accounts");
                console.log(response.data);                
            }
            catch(error){
                console.log("error");                
            }
        }
        show()
    },[])
    
  return (
    <div>
      
    </div>
  )
}
