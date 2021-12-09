import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched:false },
  { "src": "/img/potion-1.png", matched:false },
  { "src": "/img/ring-1.png"  , matched:false  },
  { "src": "/img/scroll-1.png", matched:false },
  { "src": "/img/shield-1.png", matched:false },
  { "src": "/img/sword-1.png" , matched:false}
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceone, setChoiceOne] = useState(null)
  const [choicetwo, setChoiceTwo] = useState(null)
  const [disabled, setdisabled]= useState(false)
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }
  useEffect(()=>{
    shuffleCards();

  },[])
  const handleChoice = (card) => {
    choiceone? setChoiceTwo(card): setChoiceOne(card)
  }
  useEffect(()=>{
    
    if(choiceone!==null&&choicetwo!==null){
      setdisabled(true)
      if(choiceone.src===choicetwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if (card.src===choicetwo.src){
              return {...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        resetturns()

      }
      else{
        setTimeout(()=>
        resetturns(),500)
      }
    }


  },[choiceone, choicetwo])
  const resetturns =()=>{
    setChoiceTwo(null)
    setChoiceOne(null)
    setdisabled(false)
    setTurns(prevTurns=>prevTurns+1)
    
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
          key={card.id} 
          card={card}
          disabled={disabled} 
          flipped={card===choiceone || card===choicetwo|| card.matched}
          handleChoice={handleChoice}/>
          
          
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
