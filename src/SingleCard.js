import "./singleCard.css"
export default function SingleCard({ disabled,card , handleChoice, flipped}) {
    const handleClick = () => {
        if (!disabled){
            handleChoice(card);
        }
    }
    return (

        <div className="card">
            <div className={flipped? "flipped" : ""}>
                <img src={card.src} className="front" alt="card front" />
                <img className="back"
                    src="/img/cover.png"
                    alt="card back"
                    onClick={handleClick} />
            </div>
        </div>
    )
}
