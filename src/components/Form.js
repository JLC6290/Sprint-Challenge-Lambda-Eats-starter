import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    sauce: yup.boolean().required("You must select a sauce."),
    toppings: yup.boolean().oneOf([true], "You must select at least one topping."),
})


function Form() {
    const [formState, setFormState] = useState({
        name: '',
        size: '',
        sauce: '',
        toppings: {
            pepperoni: '',
            sausage: '',
            bacon: '',
        },
        substitute: '',
        instructions: '',
        quantity: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        sauce: '',
        toppings: {
            pepperoni: '',
            sausage: '',
            bacon: '',
        },
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
                    toppings: {
                        pepperoni: '',
                        sausage: '',
                        bacon: '',
                    },
                    substitute: '',
                    instructions: '',
                    quantity: '',
                })
            })
            .catch(error => console.log("error" + error.response));
    }

    return (
        <div className="Form">
            <form>
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
                <label htmlFor="sauce">
                    Choice of sauce
                    <input type="radio" name="sauce" id="sauce1" value="red" checked={formState.sauce} onChange={inputChange} />
                        <label htmlFor="original">Original Red</label>
                    <input type="radio" name="sauce" id="sauce2" value="ranch" checked={formState.sauce} onChange={inputChange} />
                        <label htmlFor="garlic">Garlic Ranch</label>
                    <input type="radio" name="sauce" id="sauce3" value="bbq" checked={formState.sauce} onChange={inputChange} />
                        <label htmlFor="bbq">BBQ Sauce</label>
                    <input type="radio" name="sauce" id="sauce4" value="alfredo" checked={formState.sauce} onChange={inputChange} />
                        <label htmlFor="alfredo">Alfredo</label>
                </label>
                <br />
                <label htmlFor="toppings">
                    Add Toppings
                    <input type="checkbox" name="pepperoni" checked={formState.toppings.pepperoni} onChange={inputChange} />
                        <label htmlFor="pepperoni">Pepperoni</label>
                    <input type="checkbox" name="sausage" checked={formState.toppings.sausage} onChange={inputChange} />
                        <label htmlFor="sausage">Sausage</label>
                    <input type="checkbox" name="bacon" checked={formState.toppings.bacon} onChange={inputChange} />
                        <label htmlFor="bacon">Bacon</label>    
                </label>
                <label htmlFor="substitute">
                    Choice of Substitute
                    <input type="checkbox" name="substitute" checked={formState.substitute} onChange={inputChange} />
                </label>
                <br />
                <label htmlFor="instructions">
                    Special instructions
                    <textarea name="instructions" />
                </label>
                <br />
                <button disabled={disableButton} type="submit">Submit Order</button>
            </form>
        </div>
    );
};
export default Form;