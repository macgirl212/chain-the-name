import styles from '../styles/Home.module.scss'

const EndingMessages = () => {
    const name = sessionStorage.getItem('nameToContinue')

    if (name === '') {
        return (
            <h2 className={styles.endMessage}>Congratulations! You already called all the names that start with that letter.</h2>
        )
    }

    return (
        <h2 className={styles.endMessage}>Great job! But you could have lasted longer if you remembered <br /><span className={styles.endName}>{name}</span>.</h2>
    )
}

export default EndingMessages