import { useState, useContext, useEffect } from "react"
import { Context } from "../Context"
import MatchesList from "../components/MatchesList"

function Matches() {
    const {allPlayers, addToAllMatches} = useContext(Context)
    const [playerOneId, setPlayerOneId] = useState(0)
    const [playerTwoId, setPlayerTwoId] = useState(0)
    const [msgToUser, setMsgToUser] = useState("")
    const [isSetPlaying, setIsSetPlaying] = useState(false)
    const [isMatchPlaying, setIsMatchPlaying] = useState(false)
    const [playerOneSets, setPlayerOneSets] = useState([0, 0, 0, 0, 0])
    const [playerTwoSets, setPlayerTwoSets] = useState([0, 0, 0, 0, 0])
    const [currentSet, setCurrentSet] = useState(1)
    const [playerOneSetsWon, setPlayerOneSetsWon] = useState(0)
    const [playerTwoSetsWon, setPlayerTwoSetsWon] = useState(0)
    const [matchOver, setMatchOver] = useState(false)
    const [newMatch, setNewMatch] = useState(false)

    useEffect(() => {
        const p1 = playerOneSets[currentSet - 1]
        const p2 = playerTwoSets[currentSet - 1]
        
        if (p1 > 10 || p2 > 10) {
            const difference = Math.abs(p1 - p2)
            if (difference >= 2) {
                setIsSetPlaying(false)
            } else {
                setIsSetPlaying(true)
            }
        } else {
            setIsSetPlaying(true)
        }
    }, [playerOneSets, playerTwoSets, currentSet])

    useEffect(() => {
        if (playerOneSetsWon === 3 || playerTwoSetsWon === 3) {
            setMatchOver(true)
            setMsgToUser("")
        }
    }, [playerOneSetsWon, playerTwoSetsWon])

    const playersOptions = allPlayers.map(player => (
        <option 
            key={player.id} 
            value={player.id}
        >
            {player.firstName} {player.lastName}
        </option>
    ))

    function getPlayer(id) {
        return allPlayers.find(player => player.id === id)
    }

    function handlePlayerPick(event) {
        const {name, value} = event.target

        if (name === "firstPlayer") {
            setPlayerOneId(parseInt(value))
        } else {
            setPlayerTwoId(parseInt(value))
        }
    }

    function toggleNewMatch() {
        setNewMatch(prevState => !prevState)
    }

    function handleStartMatch(event) {
        if (playerOneId !== 0 && playerTwoId !== 0) {
            if (playerOneId !== playerTwoId) {
                setIsMatchPlaying(true)
                setIsSetPlaying(true)
                setMsgToUser("Match started!")
            } else {
                setMsgToUser("You must choose another player.")
            }
        } else {
            setMsgToUser("You have to pick 2 players.")
        }
        
        event.preventDefault()
    }

    function updateSets(index, name, sets) {
        const newSets = sets.map((set, i) => {
            if (i === index) {
                if (name === "p1+" || name === "p2+") {
                    return set + 1;
                } else {
                    return set - 1;
                }
            } else {
                return set;
            }
        });
        
        if (name === "p1+" || name === "p1-") {
            setPlayerOneSets(newSets)
        } else {
            setPlayerTwoSets(newSets)
        }
    }

    function handlePoints(event) {
        const {name} = event.target

        if (name === "p1-") {
            updateSets(currentSet - 1, name, playerOneSets)
        } else if (name === "p1+") {
            updateSets(currentSet - 1, name, playerOneSets)
        } else if (name === "p2-") {
            updateSets(currentSet - 1, name, playerTwoSets)
        } else if (name === "p2+") {
            updateSets(currentSet - 1, name, playerTwoSets)
        }
    }

    function handleNextSet() {
        if (playerOneSets[currentSet - 1] > playerTwoSets[currentSet - 1])
        {
            setPlayerOneSetsWon(prevState => prevState + 1)
        } else {
            setPlayerTwoSetsWon(prevState => prevState + 1)
        }

        setCurrentSet(prevState => prevState + 1)
        setIsSetPlaying(true)
    }

    function clearValues() {
        setPlayerOneSetsWon(0)
        setPlayerTwoSetsWon(0)
        setPlayerOneSets([0, 0, 0, 0, 0])
        setPlayerTwoSets([0, 0, 0, 0, 0])
        setCurrentSet(1)
        setMatchOver(false)
        setIsMatchPlaying(false)
        setNewMatch(false)
    }

    function handleMatchEnd() {
        const newMatch = {
            player1: {
                id: playerOneId,
                firstName: getPlayer(playerOneId).firstName,
                lastName: getPlayer(playerOneId).lastName,
                sets: playerOneSets,
                setsWon: playerOneSetsWon
            },
            player2: {
                id: playerTwoId,
                firstName: getPlayer(playerTwoId).firstName,
                lastName: getPlayer(playerTwoId).lastName,
                sets: playerTwoSets,
                setsWon: playerTwoSetsWon
            }
        }

        addToAllMatches(newMatch)
        clearValues()
    }

    return (
        <main className="matches">
            {newMatch &&
                <div>
                    <table className="live-table">
                        <tbody>
                            <tr>
                                <th>SETS:</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                            </tr>
                            <tr>
                                <th>{playerOneId > 0 ? getPlayer(playerOneId).firstName + ":" : "Player1:"}</th>
                                <td className={playerOneSets[0] > playerTwoSets[0] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerOneSets[0]}</td>
                                <td className={playerOneSets[1] > playerTwoSets[1] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerOneSets[1]}</td>
                                <td className={playerOneSets[2] > playerTwoSets[2] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerOneSets[2]}</td>
                                <td className={playerOneSets[3] > playerTwoSets[3] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerOneSets[3]}</td>
                                <td className={playerOneSets[4] > playerTwoSets[4] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerOneSets[4]}</td>
                            </tr>
                            <tr>
                                <th>{playerTwoId > 0 ? getPlayer(playerTwoId).firstName + ":" : "Player2:"}</th>  
                                <td className={playerTwoSets[0] > playerOneSets[0] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerTwoSets[0]}</td>
                                <td className={playerTwoSets[1] > playerOneSets[1] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerTwoSets[1]}</td>
                                <td className={playerTwoSets[2] > playerOneSets[2] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerTwoSets[2]}</td>
                                <td className={playerTwoSets[3] > playerOneSets[3] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerTwoSets[3]}</td>
                                <td className={playerTwoSets[4] > playerOneSets[4] ? "td-bold" : "td-normal"}>{isMatchPlaying && playerTwoSets[4]}</td>
                            </tr>
                        </tbody>
                    </table>

                    {!isMatchPlaying &&
                        <form onSubmit={handleStartMatch}>
                            <label>
                                Pick first player:
                                <select className="pick-player-item" name="firstPlayer" value={playerOneId} onChange={handlePlayerPick}>
                                    <option value={0}>---</option>
                                    {playersOptions}
                                </select>
                            </label>
                            <br />
                            <label>
                                Pick second player:
                                <select className="pick-player-item" name="secondPlayer" value={playerTwoId} onChange={handlePlayerPick}>
                                    <option value={0}>---</option>
                                    {playersOptions}
                                </select>
                            </label>
                            <br />
                            <input className="pick-player-item" type="submit" value="Start match" />
                        </form>
                    }

                    {isMatchPlaying &&
                        <div>
                            {!matchOver &&
                                <div className="add-points">
                                    <p>{getPlayer(playerOneId).firstName}:</p>
                                    <button 
                                        name="p1-" 
                                        onClick={handlePoints}
                                        disabled={playerOneSets[currentSet - 1] === 0 ? true : false}
                                    >
                                        -1
                                    </button>
                                    <p>{playerOneSets[currentSet - 1]}</p>
                                    <button 
                                        name="p1+"
                                        onClick={handlePoints}
                                        disabled={isSetPlaying ? false : true}
                                    >
                                        +1
                                    </button>
                                </div>
                            }
                            {!matchOver &&
                                <div className="add-points">
                                    <p>{getPlayer(playerTwoId).firstName}:</p>
                                    <button 
                                        name="p2-" 
                                        onClick={handlePoints}
                                        disabled={playerTwoSets[currentSet - 1] === 0 ? true : false}
                                    >
                                        -1
                                    </button>
                                    <p>{playerTwoSets[currentSet - 1]}</p>
                                    <button 
                                        name="p2+" 
                                        onClick={handlePoints}
                                        disabled={isSetPlaying ? false : true}
                                    >
                                        +1
                                    </button>
                                </div>
                            }
                            {!isSetPlaying &&
                                <button onClick={handleNextSet}>Next set</button>
                            }
                            {matchOver &&
                                <button onClick={handleMatchEnd}>End match</button>
                            }
                        </div>
                    }

                    <p className="user-message">{msgToUser}</p>
                </div>
            }    
            {!newMatch && 
                <div>
                    <button className="new-match-btn" onClick={toggleNewMatch}>New match</button>
                    <h3 className="matches-title">ALL MATCHES</h3>
                    <MatchesList />
                </div>
            }
            
        </main>
    )
}

export default Matches