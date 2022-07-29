import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import PlayerForm from '../components/PlayerForm'

const Home: NextPage = () => {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Chain the Name</h1>
      <Link href="/game">
        <a className={styles.playButton}>Play</a>
      </Link>
      <PlayerForm />
    </main>
  )
}

export default Home
