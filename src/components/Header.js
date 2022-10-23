import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <Link to="/"><h2>Players</h2></Link>
            <Link to="matches"><h2>Matches</h2></Link>
        </header>
    )
}

export default Header