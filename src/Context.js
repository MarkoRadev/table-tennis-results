import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPlayers, setAllPlayers] = useState(JSON.parse(localStorage.getItem("players")) || [])
    const [addingNewPlayer, setAddingNewPlayer] = useState(false)
    const [allMatches, setAllMatches] = useState(JSON.parse(localStorage.getItem("matches")) || [])

    useEffect(() => {
        localStorage.setItem("players", JSON.stringify(allPlayers))
    }, [allPlayers])

    useEffect(() => {
        localStorage.setItem("matches", JSON.stringify(allMatches))
    }, [allMatches])

    function getNewId(arr) {
        if (arr.length > 0) {
            return arr.at(-1).id + 1
        } else {
            return 1
        }
    }

    function toggleAddingNewPlayer() {
        setAddingNewPlayer(prevState => !prevState)
    }

    function addToAllPlayers(player) {
        const newPlayer = {
            id: getNewId(allPlayers), 
            firstName: player.firstName,
            lastName: player.lastName,
            setsWon: 0
        }
        setAllPlayers([...allPlayers, newPlayer])
    }

    function getPlayerSetsWon(playerId) {
        let sets = 0;

        const arrOfSetsWon = allMatches.map(match => {
            if (match.player1.id === playerId) {
                return match.player1.setsWon
            } else if (match.player2.id === playerId) {
                return match.player2.setsWon
            } 
            return 0
        })

        for (let i = 0; i < arrOfSetsWon.length; i++) {
            sets += arrOfSetsWon[i]
        }

        return sets
    }

    function addToAllMatches(match) {
        const newMatch = {
            id: getNewId(allMatches),
            player1: match.player1,
            player2: match.player2
        }
        setAllMatches([...allMatches, newMatch])
    }

    return (
        <Context.Provider value={{allPlayers, addingNewPlayer, toggleAddingNewPlayer, addToAllPlayers, addToAllMatches, getPlayerSetsWon, allMatches}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
