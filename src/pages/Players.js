import { useContext, useState } from "react"
import { Context } from "../Context"
import NewPlayer from "../components/NewPlayer"
import PlayerOverview from "../components/PlayerOverview"

function Players() {
    const {allPlayers, addingNewPlayer, toggleAddingNewPlayer, getPlayerSetsWon} = useContext(Context)
    const [playerOverviewId, setPlayerOverviewId] = useState(0)

    const playersSortedBySetsWon = allPlayers.map(player => (
        {...player, 
            setsWon: getPlayerSetsWon(player.id)
        }
    )).sort((a, b) => b.setsWon - a.setsWon)

    const playersList = playersSortedBySetsWon.map(item => (
        <li key={item.id}>
            <h4 onClick={() => handlePlayerOverview(item.id)}>
                {item.firstName}
            </h4>
            {playerOverviewId === item.id && 
                <PlayerOverview firstName={item.firstName} lastName={item.lastName} setsWon={item.setsWon} />
            }
        </li>
    ))

    function handlePlayerOverview(id) {
        if(id === playerOverviewId) {
            setPlayerOverviewId(0)
        } else {
            setPlayerOverviewId(id)
        }
    }

    return (
        <main className="players">
            {addingNewPlayer&& <NewPlayer />}
            {!addingNewPlayer&& 
                <button onClick={toggleAddingNewPlayer}>Add new player</button>
            }
            <div>
                <ol className="players-list">
                    {playersList}
                </ol>
            </div>
        </main>
    )
}

export default Players