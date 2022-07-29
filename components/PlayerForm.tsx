import { useEffect, useState } from 'react'
import shuffleArray from './shuffleArray'
import styles from '../styles/Home.module.scss'

const PlayerForm = () => {
    const [playerName, setPlayerName] = useState<string>('')
    const [playersToLoad, setPlayersToLoad] = useState<string[]>([])

    const handlePlayerSubmit = (event: any) => {
        event.preventDefault()
        setPlayersToLoad([...playersToLoad, playerName])
        setPlayerName('')
    }

    const handlePlayerChange = (event: any) => {
        setPlayerName(event.target.value)
    }

    useEffect(() => {
        const players = shuffleArray(playersToLoad)
        sessionStorage.setItem('total-players', players.toString())
    }, [playersToLoad])

      return (
        <>
            <form onSubmit={handlePlayerSubmit} className={styles.playerForm}>
                <input onChange={handlePlayerChange} className={styles.playersInput} id="name" type="text" value={playerName} autoComplete="off"/>
                <button className={styles.submitButton} type="submit">Add Player</button>
            </form>
            <ul className={styles.playerList}>
                {playersToLoad.map((name, index) => {
                    return (
                        <li className={styles.player} key={index}>{name}</li>
                    )
                })}
            </ul>
        </>
      )
}

export default PlayerForm