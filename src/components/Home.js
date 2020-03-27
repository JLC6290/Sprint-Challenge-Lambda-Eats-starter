import React, { useState, useEffect } from "react";

import Form from "./components/Form";

function Home() {
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
    <Form/>
  );
};
export default Home;
