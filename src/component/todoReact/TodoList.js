import React, { useEffect, useState } from 'react'
import "./style.css"
import { set } from 'mongoose';

function TodoList() {

    const getLocatData =()=>{
       const lists =  localStorage.getItem("mytodolist");

       //checking if list containng any data or its empty....
       if(lists)
       {
            return JSON.parse(lists);
       }
       else
            {
                return [];
            }

    }

    const [textVal,setTextVal] = useState("");
    const [items,setitems] = useState(getLocatData());
    const[isEdit,setIsEdit] = useState(false);
    const[fetchId,SetId] = useState("");
    
    // Adding new item to the list
    const addList=()=>
    {
        if(textVal==="")
            return;
        else if(textVal && isEdit)
        {
            //This point i Didn't get Much........
            setitems(items.map((curElm)=>{
                 if( curElm.id === fetchId)
                 {
                    return{...curElm , name:textVal}
                 }
                 return curElm;
            }));
            setTextVal("");
            SetId(null);
            setIsEdit(false);

        }
// Remember the syntax
        else
        {
        const newInput = {
            id : new Date().getTime().toString(),
            name : textVal,
        };
        setitems([... items,newInput]);
    }
        setTextVal("");
        console.log(items);
        setIsEdit(false);
    }

    //deleting that item.....
    const deleteItem=(index)=>{

        const newItem = ()=>{
            // yaha item.map nahi likhna balki filter krna hai taaki usme null vali value store naa ho.
           return items.filter((elm)=>{
                return elm.id !==index;
            })
        }
      
        setitems(newItem);
    }
    //Removing all items
    const removeAll=()=>{
        setitems([]);
        setIsEdit(false);
        setTextVal("");
    }
    //Adding to Local Storage...

    useEffect(()=>{

        //Saving this data to the localstroge whenever there is change in item.
        localStorage.setItem("mytodolist",JSON.stringify(items));

        },
    [items])
 
   
    //Editing the items
     
    const editItem=(elm)=>{
        setIsEdit(true);
        setTextVal(elm.name);
        SetId(elm.id);
        

    }

  return (
       <>
           <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo.svg" alt="logo" />
                    <figcaption>Add Your List Here ✌</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text"
                        placeholder='✍ Add Item...'
                        className='form-control'
                        value={textVal}
                        onChange={(event) => setTextVal(event.target.value)}
                    />
                   {
                        !isEdit? <i className="fa fa-plus add-btn" onClick={addList}></i>:<i className="far fa-edit add-btn" onClick={addList}></i>
                   }
                </div>
                <div className='showItems'>
{/* we need to return the value from map... */}
            {
                items.map((elm)=>{  
            
                 return(   <div className="eachItem" key={elm.id}>
                    <h3>{elm.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>editItem(elm)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(elm.id)}></i>
                    </div>
                        </div>
                 ) 
                })
            }
                   
                </div>
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={()=>removeAll()}>
                        <span> Check List</span>
                        </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default TodoList