import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function Operations() {
    const location = useLocation()

    const [operations, setOperations] = useState()

    useEffect(() => {
        getOperations()
    }, [])

    const getOperations = () => {
        axios.get(
            process.env.REACT_APP_API_URL + '/api/reservation/status/Onaylandı?startDate=' + location.state.startDate + '&endDate=' + location.state.endDate
        ).then(response => {
            if (response.status === 200) {
                setOperations(response.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="App">

        </div>
    )
}