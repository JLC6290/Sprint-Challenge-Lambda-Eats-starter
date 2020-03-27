import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field.").min(2, "Please enter an actual name."),
    // sauce: yup.boolean().required("You must select a sauce."),
    bacon: yup.boolean(),
    sausage: yup.boolean(),
    pepperoni: yup.boolean(),
    substitute: yup.boolean(),
    instructions: yup.string(),

    // toppings: yup.boolean().oneOf([true], "You must select at least one topping."),
})


function Form() {
    const [formState, setFormState] = useState({
        name: '',
        size: '',
        // sauce: '',
  
            pepperoni: '',
            sausage: '',
            bacon: '',
 
        substitute: '',
        instructions: '',
        quantity: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        // sauce: '',
  
            pepperoni: '',
            sausage: '',
            bacon: '',
    
        substitute: '',
        instructions: '',
        quantity: '',
    })

    const [disableButton, setDisableButton] = useState(true)

    const [post, setPost] = useState([])

    useEffect(()=> {
        formSchema.isValid(formState).then(valid => {
            setDisableButton(!valid)
        })
    }, [formState])

    const validateName = e => {
        console.log("e.target.name : ", e.target.name)
        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(() => {
                setErrors({
                    ...errors, [e.target.name]: ""
                })
            })
            .catch(err => {
                setErrors({
                    ...errors, [e.target.name]: err.errors
                })
            })
    }

    const inputChange = e => {
        e.persist();
        console.log(e);
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        };
        validateName(e)
        setFormState(newFormData);
    }

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(result => {
                setPost(result.data);
                console.log("success", post);
                setFormState({
                    name: '',
                    size: '',
                    sauce: '',
               
                        pepperoni: '',
                        sausage: '',
                        bacon: '',
           
                    substitute: '',
                    instructions: '',
                    quantity: '',
                })
            })
            .catch(error => console.log("error" + error.response));
    }

    return (
        <div className="Form">
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="size">
                    Choice of size
                <select id="size" name="size">
                        <option value="8-inch">8 inch</option>
                        <option value="10-inch">10 inch</option>
                        <option value="12-inch">12 inch</option>
                        <option value="14-inch">14 inch</option>
                        <option value="16-inch">16 inch</option>
                    </select>
                </label>
                <br />
                {/* <label htmlFor="sauce">
                    Choice of sauce
                    <label htmlFor="original"><input type="radio" name="sauce" id="sauce1" value="red" checked={formState.sauce} onChange={inputChange}/>Original Red</label>
                    <label htmlFor="garlic"><input type="radio" name="sauce" id="sauce2" value="ranch" checked={formState.sauce} onChange={inputChange}/>Garlic Ranch</label>
                    <label htmlFor="bbq"><input type="radio" name="sauce" id="sauce3" value="bbq" checked={formState.sauce} onChange={inputChange}/>BBQ Sauce</label>
                    <label htmlFor="alfredo"><input type="radio" name="sauce" id="sauce4" value="alfredo" checked={formState.sauce} onChange={inputChange}/>Alfredo</label>
                </label> */}
                <br />
                <label htmlFor="toppings">
                    Add Toppings
                    <label htmlFor="pepperoni"><input type="checkbox" name="pepperoni" checked={formState.pepperoni} onChange={inputChange}/>Pepperoni</label>
                    <label htmlFor="sausage"><input type="checkbox" name="sausage" checked={formState.sausage} onChange={inputChange}/>Sausage</label>
                    <label htmlFor="bacon"><input type="checkbox" name="bacon" checked={formState.bacon} onChange={inputChange}/>Bacon</label>    
                </label>
                <label htmlFor="substitute">
                    Choice of Substitute
                    <input type="checkbox" name="substitute" checked={formState.substitute} onChange={inputChange} />
                </label>
                <br />
                <label htmlFor="instructions">
                    Special instructions
                    <textarea name="instructions" value={formState.instructions} onChange={inputChange}/>
                </label>
                <br />
                <button disabled={disableButton} type="submit">Submit Order</button>

                <br /><br /><br />
                <pre>{JSON.stringify(post, null, 2)}</pre>
            </form>
        </div>
    );
};
export default Form;