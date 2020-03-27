import React from "react";
import { useHistory, Route } from "react-router-dom";


function Home() {
    const goBack = useHistory()
    console.log("goBack value : ", goBack);

    return (
        
    )
}

export default Home;