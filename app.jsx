import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [loading, setLoading] = useState([true])
  const [card, setCard] = useState([])
  const [selectedHero, setSelectedHero] = useState("Select your hero above 👆🏼")
  const [selectedCard, setSelectedCard] = useState()
  const [selectedSkills, setSelectedSkills] = useState([false])
  const [skillsCard, setSkillsCard] = useState()

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
    const skillsHeroes = dataHeroes.skills;
    console.log('response', skillsHeroes);
    setSelectedSkills(true);
    setSkillsCard(skillsHeroes);
  };

  const handleClick = async (name, id) => {
    setSelectedHero("See " + name + "'s skills")
    setSelectedCard(id)
  };

  return (
    <div className="container">
      {loading ? (<h1>Loading.... Calling your heroes....</h1>) : selectedSkills ? (
        (card.map(function (hero) {
          return (
            <div key={hero.id} className={hero.id == selectedCard ? "card-active" : "card"}>
              <img className="image" src={hero.imgSrc}/>
              <h1>{hero.name}</h1>
              <h2>{hero.age}</h2>
              <h3>{hero.origin}</h3>
              <button className="btn" onClick={() => handleClick(hero.name, hero.id)}>Select</button>
            </div>
          )
        }))
      ) : (
        (skillsCard.map(function (skill){
          return (
            <div className="card">
              <img className="image" src={skill.imgSrc}/>
              <h1>{skill.name}</h1>
            </div>
          )
        }))
      )}
      {!loading && <button className="btn" onClick={() => skillsClick(selectedCard)}>{selectedHero}</button>}
    </div>
  )
};

ReactDOM.render(<App />, root)
