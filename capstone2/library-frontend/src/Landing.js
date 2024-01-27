import React, { useEffect, useState } from "react"
import LibraryApi from "./api"

function Landing () {
    const [result, setResult] = useState()
    useEffect( () => {
        async function getConn(){
            const res = await LibraryApi.testConnection()
            setResult(res)
        }
        getConn()
    }
    )

    return (
        <div>
            <h2>Welcome to The Library!</h2>
            <h3>{result}</h3>
        </div>
    )
}

export default Landing