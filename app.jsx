import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [loading, setLoading] = useState([true])
  const [card, setCard] = useState([])
  const [selectedHero, setSelectedHero] = useState("Select your hero above 👆🏼")
  const [selectedCard, setSelectedCard] = useState()

  // Fetch API, format JSX
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://materi-thrive-demo.vercel.app/api/hero')
      const dataHeroes  = await response.json()
      console.log('response', dataHeroes)
      setCard(dataHeroes)
      setLoading(false)
    }
    getData()
  }, []);

  const skillsClick = async () => {
    const response = await fetch(`https://materi-thrive-demo.vercel.app/api/hero/${selectedCard}`)
    const dataHeroes = await response.json()
    console.log('response', dataHeroes);
  }

  const handleClick = (name, id) => {
    setSelectedHero("See " + name + "'s skills")
    setSelectedCard(id)
  }

  return (
    <div className="container">
      {loading ? (<h1>Loading.... Calling your heroes....</h1>) : (card.map(function (hero) {
        return (
          <div key={hero.id} className={hero.id == selectedCard ? "card-active" : "card"}>
            <img className="image" src={hero.imgSrc}/>
            <h1>{hero.name}</h1>
            <h2>{hero.age}</h2>
            <h3>{hero.origin}</h3>
            <button onClick={() => handleClick(hero.name, hero.id)}>Select</button>
          </div>
        )
      }))}
      {!loading && <button onClick={() => skillsClick(selectedCard)}>{selectedHero}</button>}
    </div>
  )
};

ReactDOM.render(<App />, root)
