import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Scores: NextPage = () => {
    const score = sessionStorage.getItem('score')
    const name = sessionStorage.getItem('nameToContinue')
    let endingMessage: string
    
    if (name === '') {
        endingMessage = 'Congratulations! You already called all the names that start with that letter.'
    } else {
        endingMessage = `Great job! But you could have lasted longer if you remembered ${name}.`
    }

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.title}>Score:</h1>
            <h2 className={styles.title}>{score}</h2>
            <h2>{endingMessage}</h2>
            <Link href="/">
                <a className={styles.playButton}>Try Again</a>
            </Link>
        </main>
    )
}

export default Scores