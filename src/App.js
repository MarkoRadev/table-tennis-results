import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Players from "./pages/Players";
import Matches from "./pages/Matches";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route index element={<Players />} />
                <Route path="matches" element={<Matches />} />
            </Routes>
        </div>
    );
}

export default App;
