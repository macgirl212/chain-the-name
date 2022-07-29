import styles from "../styles/Game.module.scss"

const ErrorMessages = (error: any) => {
    return (
        <h2 className={styles.errorMessage}>{error.error}</h2>
    )
}

export default ErrorMessages