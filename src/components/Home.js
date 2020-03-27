import React from "react";
import { useHistory } from "react-router-dom";


function Home() {
    const goBack = useHistory()
    console.log("goBack value : ", goBack);

    const placeOrder = () => {
        console.log("processing...");
        goBack.push("/order");
    }

    return (
        <button onClick={placeOrder}>Place an Order</button>
    )
}

export default Home;