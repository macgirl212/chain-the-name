import type { NextPage } from 'next'
import Link from 'next/link'
import EndingMessages from '../components/EndingMessages'
import styles from '../styles/Home.module.scss'

const Scores: NextPage = () => {
    const score = sessionStorage.getItem('score')

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.title}>Score:</h1>
            <h2 className={styles.title}>{score}</h2>
            <EndingMessages />
            <Link href="/">
                <a className={styles.playButton}>Try Again</a>
            </Link>
        </main>
    )
}

export default Scores