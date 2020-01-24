import React from 'react';
import Axios from 'axios';
import { Card } from '../../models/Card';
import FlashCard from '../flash-card/flash-card.component';
import './cards.styles.css';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            finishedCards: [],
            flashCard: new Card(),
            status: 'loading'
        }
    }

    componentDidMount(){
        if (this.props.fadein) {
            document.getElementsByClassName('cards')[0].classList.add('fadein');
        } else {
            document.getElementsByClassName('cards')[0].classList.remove('fadein');
        }
        Axios.get('https://fullstackofcards.herokuapp.com/flashcards/getCards') //  Gets all the cards
        .then(data => {
            return JSON.parse(data.request.response);   //  Parses the cards List
        })
        .then(cards => {
            this.setState({cards:cards}, () => {    //  Sets the cards property of this state to the cards list we got.
                this.pickCard();                    //  Also pass in a callback function that will happen after set state which will select a card.
            });
        }).catch(error => {                         //  Standard error
            console.log(error)
        })
    }

    pickCard = () => {
        let card = new Card();
        if (this.state.cards.length != 0)
        {
            card = this.state.cards[Math.floor(Math.random()*this.state.cards.length)]          //  Initializes a randomc card
            while (this.state.finishedCards.includes(card.id)) {                                //  If this was already found. 
                card = this.state.cards[Math.floor(Math.random()*this.state.cards.length)];     //  Loop for another card
            }
        } else                                                                                  //  If there are no cards. Create a fake one. 
        {
            card.id = -1;
            card.question = "Why are there no questions?"
            card.answer = "Because no one added cards yet. Be the first to register and add a card!"
        }
        card.showAnswer = false;                                                            //  
        this.setState({flashCard:card, status:'done'});
    }

    next = () => {
        let finished = this.state.finishedCards;
        finished.push(this.state.flashCard.id);
        if (this.state.finishedCards.length < this.state.cards.length) {
            this.setState({finishedCards:finished}, () => {
                this.pickCard();
            })
        } else {
            this.setState({finishedCards:[]}, () => {
                this.pickCard();
            })
        }
    }

    show = () => {
        let card = this.state.flashCard;
        card.showAnswer = true;
        this.setState({ flashCard:card })
    }

    render(){
        const { flashCard, status } = this.state;
        return(
            <div className="cards">
                {status === 'done' && <FlashCard flashCard={flashCard} show={this.show} next={this.next} />}
            </div>
            
        )
    }
}

export default Cards;