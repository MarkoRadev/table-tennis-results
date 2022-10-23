import { useContext, useState } from "react"
import { Context } from "../Context"
import MatchTable from "./MatchTable"

function MatchesList() {
    const {allMatches} = useContext(Context)
    const [matchOverviewId, setMatchOverviewId] = useState(0)

    const matchItems = allMatches.map(item => (
        <li key={item.id} onClick={() => handleMatchOverview(item.id)}>
            <p>
                {item.player1.firstName} {item.player1.lastName} vs {item.player2.firstName} {item.player2.lastName}
            </p>
            {matchOverviewId === item.id && <MatchTable match={item} />}
        </li>
    ))

    function handleMatchOverview(id) {
        if(id === matchOverviewId) {
            setMatchOverviewId(0)
        } else {
            setMatchOverviewId(id)
        }
    }

    return(
        <div className="matches-list">
            <ul>
                {matchItems}
            </ul>
        </div>
    )
}

export default MatchesList