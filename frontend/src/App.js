import { Routes } from "react-router-dom";


function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
