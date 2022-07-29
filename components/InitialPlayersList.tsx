import { useState, useEffect } from 'react'

const InitialPlayersList = () => {
    const [players, setPlayers]= useState<string[]>(['first player'])

    useEffect(() => {
        if (sessionStorage.getItem("total-players") !== null) {
            setPlayers(sessionStorage.getItem('total-players')?.split(',') || [])
        }
    }, [players])
    

    return (
        <h1>Hello World</h1>
    )
}

export default InitialPlayersList