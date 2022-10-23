function PlayerOverview(props) {
    return(
        <div>
            <p>{props.firstName} {props.lastName}</p>
            <p>Sets won: {props.setsWon}</p>
        </div>
    )
}

export default PlayerOverview