import type { NextPage } from 'next'
import Router from "next/router";
import { useEffect, useState, useLayoutEffect } from 'react'
import { alphabetArray, allNamesArray } from '../wordArrays'
import ErrorMessages from '../components/ErrorMessages';
import PlayerList from '../components/PlayerList'
import findName from '../components/findName';
import initialLetter from '../components/initialLetter';
import styles from '../styles/Game.module.scss'

const Game: NextPage = () => {
    const [calledNameList, setCalledNameList] = useState<string[]>([])
    const [error, setError] = useState<string>('')
    const [nameValue, setNameValue] = useState<string>('')
    const [letter, setLetter] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(true)
    const [currentPlayer, setCurrentPlayer] = useState<number>(-1)
    const [inactivePlayerIndex, setInactivePlayerIndex] = useState<number[]>([])
    const [activeGame, setActiveGame] = useState<boolean>(true)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // findName function will check if name exists
        console.log(findName(nameValue, letter))

        const nameToCheck = findName(nameValue.toLowerCase(), letter)

        if (nameValue.charAt(0).toLowerCase() !== letter) {
            // validate if name starts with correct letter
            setError(`This name does not start with ${letter.toUpperCase()}`)
            setIsValid(false)
        } else if (!nameToCheck) {
            // validate if name exists
            setError('This name does not exist')
            setIsValid(false)
        } else if (calledNameList.includes(nameToCheck)) {
            // validate if name was already entered
            setError('This name was already entered')
            setIsValid(false)
        } else {
            // name is valid to use
            setIsValid(true)
            setCalledNameList([...calledNameList, nameToCheck])
            setLetter(nameValue.slice(-1))
            setNameValue('')
        }
    }

    const handleChange = (event: any) => {
        setNameValue(event.target.value)
    }

    const chooseNextPlayer = (currentPlayer: number) => {
        setCurrentPlayer(currentPlayer)
    }

    const skipPlayer = () => {
        setInactivePlayerIndex([...inactivePlayerIndex, currentPlayer])
        setCurrentPlayer(currentPlayer + 1)
    }

    // changes color of input
    const changeColor = () => {
        const inputElem = document.querySelector("input")
        if (isValid) {
            inputElem!.style.backgroundColor = 'white'
        } else {
            inputElem!.style.backgroundColor = 'pink'
        }
    }

    const getRandomName = (letter: string) => {
        // if no letter is selected, return
        if (letter === '') {
            sessionStorage.setItem('nameToContinue', '')
            return
        }

        const letterIndex = alphabetArray.indexOf(letter)
        const length = allNamesArray[letterIndex].length

        // check if all names that starts with chosen letter was already called
        const calledNamesFromLetter = calledNameList.filter((name) => name.startsWith(letter.toUpperCase()))
        if (calledNamesFromLetter.length === length) {
            sessionStorage.setItem('nameToContinue', '')
            return
        }
        
        // grab a random name that starts with chosen letter that was not already called
        const index = Math.floor(Math.random() * length)
        if (!calledNameList.includes(allNamesArray[letterIndex][index])) {
            sessionStorage.setItem('nameToContinue', allNamesArray[letterIndex][index])
            return
        } else {
            getRandomName(letter)
        }
    }

    // initialize with a prechosen letter
    useEffect(() => {
        setLetter(initialLetter)
    }, [])

    // changes color of input if invalid or valid
    useEffect(() => {
        changeColor()
    }, [isValid])

    // changes highlighted current player
    useLayoutEffect(() => {
        chooseNextPlayer(currentPlayer + 1)
        setCurrentPlayer(currentPlayer + 1)
    }, [calledNameList.length])

    // redirect to score page if no more active players
    useEffect(() => {
        sessionStorage.setItem('score', calledNameList.length.toString())
        getRandomName(letter)
        if (!activeGame) {
            const {pathname} = Router
                if(pathname == '/game' ){
                Router.push('/scores')
            }
        }
    }, [activeGame])

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.title} suppressHydrationWarning>Name that starts with <span className={styles.letter}>{letter.toUpperCase()}</span></h1>
            {!isValid ? <ErrorMessages error={error} /> : null}
            <form onSubmit={handleSubmit} className={styles.nameForm}>
                <input onChange={handleChange} className={styles.nameInput} id="name" type="text" value={nameValue} autoComplete="off"/>
                <button className={styles.button} type="submit">Enter</button>
                <button className={styles.button} type="button" onClick={skipPlayer}>Give Up</button>
            </form>
            <ul className={styles.calledNamesSection}>
            {calledNameList.sort((a,b) => a.localeCompare(b)).map((name, index) => {
                return (
                    <li key={index} className={`${styles.nameList} ${name}`}>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</li>
                )
            })}
            </ul>
            <PlayerList currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} inactivePlayerIndex={inactivePlayerIndex} setActiveGame={setActiveGame} />
        </main>
    )
}

export default Game