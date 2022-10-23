import { useContext, useState } from "react"
import { Context } from "../Context"

function NewPlayer() {
    const [player, setPlayer] = useState({
        firstName: "",
        lastName: ""
    })
    const {toggleAddingNewPlayer, addToAllPlayers} = useContext(Context)

    function handleChange(event) {
        const {name, value} = event.target

        setPlayer(prevPlayer => ({
            ...prevPlayer,
            [name]: value
        }))
    }

    function handleOnSubmit() {
        addToAllPlayers(player)
        toggleAddingNewPlayer()
    }

    return(
        <div>
            <div className="new-player-item">
                <label>{"First name: "}
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="First name"
                        value={player.firstName}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="new-player-item">
                <label>{"Last name: "}
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last name"
                        value={player.lastName}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button className="new-player-item" onClick={handleOnSubmit}>
                Submit
            </button>
        </div>
    )
}

export default NewPlayer