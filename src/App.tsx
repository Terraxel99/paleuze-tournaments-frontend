import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <p>Hello World from App !</p>

            <Outlet />
        </>
    );
}

export default App;
