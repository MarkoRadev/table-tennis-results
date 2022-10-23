function MatchTable(props) {
    const match = props.match

    function playerSets(player1, player2) {
        const playerSets = player1.sets.map((set, index) => (
            <td className={player1.sets[index] > player2.sets[index] ? "td-bold" : "td-normal"} key={index}>
                {set}
            </td>
        ))

        return playerSets
    }

    return(
        <table className="match-table">
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
                    <th>
                        {match.player1.firstName}
                    </th>
                    {playerSets(match.player1, match.player2)}
                </tr>
                <tr>
                    <th>
                        {match.player2.firstName}
                    </th>  
                    {playerSets(match.player2, match.player1)}
                </tr>
            </tbody>
        </table>
    )
}

export default MatchTable