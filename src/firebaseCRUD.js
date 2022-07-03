import { useState,useEffect,useRef } from "react";
import {db} from './firebase'
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc}  from 'firebase/firestore'
const CRUD = () => {
    const [useres,setUsers]=useState([])
    const [name,SetName]=useState('')
    
    const [Age, SetAge] = useState("");
    const userCollection =collection(db,"user")
    const UpdateAge=async (id,age)=>{
const userDoc=doc(db,"user",id)
        const newField={age:+age+1}
await updateDoc(userDoc,newField)
    }
    const Del=async (id)=>{
const userDoc=doc(db,"user",id);

await deleteDoc(userDoc) 
    }
    const newn=useRef()
    const UpdateName=async (id)=>{
        const userDoc=doc(db,"user",id)
        const newname={name:newn.current.value}
        await updateDoc(userDoc,newname)
    }
    const createUser= async ()=>{
await addDoc(userCollection,{name:name,age:Age})
    }
useEffect(()=>{
const getUser=async () =>{
const data = await getDocs(userCollection)
setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
}
getUser()
},[])
console.log(useres);
    return (
      <div className="App">
        <center>
          <input
            type="text "
            className="form-control w-auto"
            onChange={(event) => SetName(event.target.value)}
            placeholder="name"
          />
          <input
            className="form-control w-auto"
            type="number "
            onChange={(event) => SetAge(event.target.value)}
            placeholder="age"
          />
          <button className="btn btn-primary" onClick={createUser}>
            Add User
          </button>
        </center>
        {useres.map((user) => (
          <div className="div">
            <h1> Name:{user.name}</h1>
            <h2>Age:{user.age}</h2>
            <input type="text"  placeholder="ChangeName" ref={newn} />
            <button
              onClick={() => {
                UpdateName(user.id);
              }}
              className="btn btn-primary"
            >
              Change Name
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                UpdateAge(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                Del(user.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
}
 
export default CRUD;