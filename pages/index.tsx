import type { NextPage } from 'next'
import Link from 'next/link'
import logo from '../images/Chain the Name Logo.png'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import PlayerForm from '../components/PlayerForm'

const GameLogo = (props: any) => {
  return (
    <Image
      src={logo}
      alt="Chain the Name"
      width="745px"
      height="301px"
    />
  )
}

const Home: NextPage = () => {
  return (
    <main className={styles.mainContainer}>
      <GameLogo />
      <Link href="/game">
        <a className={styles.playButton}>Play</a>
      </Link>
      <PlayerForm />
    </main>
  )
}

export default Home
