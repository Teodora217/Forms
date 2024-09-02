import { useState, useRef, useEffect } from "react";
import styles from './Controlled.module.css';

export default function ControlledForm({
    formRef,
}){

    const formInitialState = {
        username: "",
        password: "",
        age: "",
        gender: "m",
        swimming: false,
        shopping: false,
        running: false,
    }

    const usernameInputRef = useRef();
    const isMountedRef = useRef(false);
    const [formValue, setFormValue] = useState(formInitialState);
    const [ageError, setAgeError] = useState({

    });

    useEffect(() => {
       usernameInputRef.current.focus();
    }, [])

    // Execute only on update

    useEffect(() => {
       if(!isMountedRef.current){
         isMountedRef.current=true;
         return;
       }
       console.log('Form is updated')
    }, [formValue])

    const changeHandler = (e) => {
        let value = '';

        switch(e.target.type){
        case "number": 
             value = Number(e.target.value);
             break;
        case "checked":
            value = e.target.checked;
            break;
        default:
            value = e.target.value;
            break;
        }
        setFormValue(state => ({
            ...state,
            [e.target.name]: value,
        }));

    }

    const resetFormHandler = () =>{
       setFormValue(formInitialState);
       setAgeError({})
    }


    const submitHandler = (e) => {
       e.preventDefault()
       console.log(formValue);
       resetFormHandler();
       
    }

    const ageValidator = () => {
    
      if(formValue.age < 0 || formValue.age > 120){
        setAgeError(state => ({
            ...state,
            age: 'Age should be between 0 and 120'
        }));
     
      }else {

           if(ageError.age){
            setAgeError(state => ({
                ...state,
                age: '',
               }))
           }
      }
    }

    return(
    <>
        <h1>Controlled Form</h1>
        <form ref={formRef} onSubmit={submitHandler}>
            <div>
            <label htmlFor="username">Username:</label>
            <input 
            ref={usernameInputRef}
            type="text" 
            name="username"
            id="username"
            value={formValue.usernameValue}
            onChange = {changeHandler}
            onBlur={() => console.log('onBlur')}
            />
            </div>
            
            <div>
            <label htmlFor="username">Password:</label>
            <input 
            type="password" 
            name="password"
            id="password"
            value={formValue.password}
            onChange={changeHandler}
            />
            </div>

            <div>
            <label htmlFor="age">Age</label>
            <input 
            type="number" 
            name="age"
            id="age" 
            value={formValue.age}
            onChange={changeHandler}
            onBlur={ageValidator}
            className={ageError.age && styles.inputError}
            />
            {ageError.age && (<p className={styles.errorMessage}> {ageError.age}</p>)}
            </div>

           <div>
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" onChange={changeHandler} value={formValue.gender}>
                <option value="f">F</option>
                <option value="m">M</option>
            </select>
           </div>
            
            <div>
            <h3>Hobbies</h3>
            <label htmlFor="hobbies">Swimming</label>
            <input type="checkbox" name="swimming" id="swimming" checked={formValue.swimming} onChange={changeHandler}/>
            <label htmlFor="shopping">Shopping</label>
            <input type="checkbox" name="shopping" id="shopping" checked={formValue.shopping} onChange={changeHandler}/>
            <label htmlFor="running">Running</label>
            <input type="checkbox" name="running" id="running" checked={formValue.running} onChange={changeHandler}/>

            </div>

            <div>
                <button type="button" onClick={submitHandler}>Register</button>
                
            </div>  
        </form>
    </>
    )
}