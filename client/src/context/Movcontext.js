import React,{useState,createContext} from 'react'

export const MovieContext=createContext()

export const MovieProvider=(props)=>{

const [recid,setrecid]=useState({
    recid:[]
})

return(
<MovieContext.Provider value={{recid,setrecid}}>
  {props.children}

</MovieContext.Provider>

)

}

