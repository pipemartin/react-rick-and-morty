import { useEffect, useState } from "react";
import Character from "./Character";

// eslint-disable-next-line react/prop-types
function NavPage({Page, setPage}){
    return (
        <header className="d-flex justify-content-between align-items-center">
            <p>Page: {Page}</p>
            <button className="btn btn-primary btn-sm"
                onClick={()=> Page>1 ? setPage(Page-1) : Page}
            >
                Back {Page-1}
            </button>
            <button className="btn btn-primary btn-sm"
                onClick={()=> setPage(Page+1)}
            >
                Page {Page+1}
            </button>
        </header>
    )
}

function CharacterList() {
  const [characters, setcharacters] = useState([]);
  const [loading, setloading] = useState(true);
  const [Page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${Page}`);
      const data = await response.json();
      setloading(false);
      setcharacters(data.results);
    }

    fetchData();
  }, [Page]);
  return (
    <div className="container">
        <NavPage Page={Page} setPage={setPage}/>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage Page={Page} setPage={setPage}/>
    </div>
  );
}

export default CharacterList;
