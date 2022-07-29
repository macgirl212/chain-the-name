const initialLetterArray: string[] = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'z']

// choose initial guessing letter
const initialLetter = () => {
    return initialLetterArray[Math.floor(Math.random() * initialLetterArray.length)]
}

export default initialLetter;