import { useEffect } from 'react'
import styles from '../styles/Game.module.scss'

const PlayerList = ({currentPlayer, setCurrentPlayer, inactivePlayerIndex, setActiveGame}: {currentPlayer: number, setCurrentPlayer: any, inactivePlayerIndex: Array<number>, setActiveGame: any}) => {
    const totalPlayers = sessionStorage.getItem('total-players')
    const activePlayers: string[] = totalPlayers?.split(',') || []

    const selectPlayer = () => {
        // loop back to the first active player if at the last active player
        if (currentPlayer >= activePlayers.length) {
            setCurrentPlayer(0)
        }

        // skip inactive players
        if (inactivePlayerIndex.includes(currentPlayer)) {
            setCurrentPlayer(currentPlayer + 1)
        }
    }

    useEffect(() => {
        if (inactivePlayerIndex.length !== activePlayers.length) {
            selectPlayer()
        } else {
            setActiveGame(false)
        }
    }, [currentPlayer])

    return (
        <ul className={styles.playerList}>
            {activePlayers.map((name, index) => {
                if (inactivePlayerIndex.includes(index)) {
                    return (
                        <li key={index} className={`player ${styles.inactive}`}>{`${name}`}</li>
                    )
                }
                if (index == currentPlayer && !inactivePlayerIndex.includes(currentPlayer)) {
                    return (
                        <li key={index} className={`${styles.player} ${styles.active}`}>{`${name}`}</li>
                    )
                }
                return (
                    <li key={index} className='player'>{`${name}`}</li>
                )

            })}
        </ul>
    )
}

export default PlayerList