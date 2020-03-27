import React, { useState, useEffect } from "react";


function Form() {
    const [formState, setFormState] = useState({
        size: '',
        sauce: '',
        toppings: '',
        substitute: '',
        instructions: '',
        quantity: '',
    })

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        };
        
        setFormState(newFormData);
    }

    return (
        <div className="Form">
            <form>
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
                <br/>
                <label htmlFor="sauce">
                    Choice of sauce
                    <input
                        type="radio"
                        name="sauce"
                        id="sauce1"
                        value="red"
                        checked={formState.sauce}
                        onChange={inputChange}
                    />
                    <label htmlFor="original">Original Red</label>
                    <input
                        type="radio"
                        name="sauce"
                        id="sauce2"
                        value="ranch"
                        checked={formState.sauce}
                        onChange={inputChange}
                    />
                    <label htmlFor="garlic">Garlic Ranch</label>
                    <input
                        type="radio"
                        name="sauce"
                        id="sauce3"
                        value="bbq"
                        checked={formState.sauce}
                        onChange={inputChange}
                    />
                    <label htmlFor="bbq">BBQ Sauce</label>
                    <input
                        type="radio"
                        name="sauce"
                        id="sauce4"
                        value="alfredo"
                        checked={formState.sauce}
                        onChange={inputChange}
                    />
                    <label htmlFor="alfredo">Alfredo</label>    
                </label>
                <br/>
                <label htmlFor="toppings">
                    Add Toppings
                    <input
                        type="checkbox"
                        name="pepperoni"
                        checked={formState.toppings}
                        onChange={inputChange}
                    />
                    <label htmlFor="pepperoni">Pepperoni</label>    
                    <input
                        type="checkbox"
                        name="sausage"
                        checked={formState.toppings}
                        onChange={inputChange}
                    />
                    <label htmlFor="sausage">Sausage</label>       
                </label>
                <label htmlFor="substitute">
                    Choice of Substitute
                    <input 
                        type="checkbox"
                        name="substitute"
                        checked={formState.toppings}
                        onChange={inputChange}
                    />
                </label>
                <br/>
                <label htmlFor="instructions">
                    Special instructions
                    <textarea
                        name="instructions"
                    />
                </label>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    );
};
export default Form;