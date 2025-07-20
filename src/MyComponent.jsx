

/* ########## { } IS USED TO INCLUDE JS INSIDE HTML AND ` ${ } ` IS USED TO DISPLAY THE VALUE OF THE VARIABLE */


import React,{useState, useEffect}  from 'react';
import styles from './MyComponent.module.css';

function ToDoList(){
  const [tasks,setTasks]= useState(()=>{                          // TO STORE ALL THE TASKS IN A MAIN ARRAY 
    const saved= localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : ['Eat Breakfast', 'Drink Water'];    //if saved is true or it exists parse elements
  });          


  const [newTask,setNewTask]= useState( '' );                              // TO GET THE NEW TASKS TYPED IN THE TEXT BOX




  function handleInputChange(e){              // THE NEW TASK BEING TYPED IS STORED INTO newTask VARIABLE
    setNewTask(e.target.value);
  }


  function addTask(e){
    
    if (newTask.trim() !==""){           // TRIM REMOVES SPACES FROM BEGINNING AND END OF STRINGS
                                        //  if only use newtask!="".......user could enter "  " and it will pass through
      setTasks( prevTasks => [...prevTasks, newTask] ) ;          // newTask being stored into the main storage array
      setNewTask(' ');
    }
  }




  function deleteTask(index){

    const updatedTasks= tasks.filter((_, i)=>  i !== index);   // can provide _ instead of (element,i)  .....since initially   
    setTasks(updatedTasks);                                    // // we give no value...WE R TELLING SYSTEM TO IGNORE IT

  }



  function moveTaskUp(index){

    if (index > 0){
      const updatedTasks= [...tasks];
      [updatedTasks[index], updatedTasks[index-1]]=  [updatedTasks[index-1], updatedTasks[index]];
      //code for mOV 1 position up
      // THIS IS CALLED ARRAY DESTRUCTURING....note: external [ ] are necessary

      setTasks(updatedTasks);     
                                 // HERE WE USE NEW ARRAY INSTEAD OF MAIN TASKS ARRAYS...SINCE USESTATE WE CANNOT DIRECLTY
                                 //CHANGE THE VARIABLE....CHANGES ARE MADE THROUGH THE CORRESP FUNCTION ()
    }

  }



  function moveTaskDown(index){

    if (index < tasks.length-1){
      const updatedTasks= [...tasks];
      [updatedTasks[index], updatedTasks[index+1]]=  [updatedTasks[index+1], updatedTasks[index]];
      setTasks(updatedTasks); 

    }
  }



  useEffect(() => {                                       // TO SAVE TO LOCALSTORAGE
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]
  );





  return(<>
    <div className={styles.to_do_list} > 

      <h1> TO-DO-LIST APP </h1>
      <div className={styles.below_heading}>
        <input type='text' placeholder='Enter a new task'  value={newTask}  onChange={handleInputChange}
          onKeyDown= {(event)=> { 
            if (event.key ==="Enter"){
              addTask();
            }
          }}/>
        <button className={styles.add_button}  onClick={addTask}> Add </button>

        <ol>
          {tasks.map((task,index) =>
            <li> 
              <span className={styles.text}> {task} </span>       {/* used span element to add DELETE BUTTON IN THE SIDE */}
              <button className={styles.delete_button} onClick={ ()=> deleteTask(index)}> Delete </button>
              <button className={styles.task_up_button} onClick={ ()=> moveTaskUp(index)}> ⬆️ </button>
              <button className={styles.task_down_button} onClick={ ()=> moveTaskDown(index)}> ⬇️ </button>
                                {/* FOR CSS ALWAYS USE {styles.name} FOR CLASSNAMES */}   
            </li>
          )}
        </ol>
      </div>

    </div>
  
    </>);
}



export default ToDoList;