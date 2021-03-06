import React from 'react'
import UserCard from '../user-card/user-card.component'
import Axios from 'axios'
import './user-cards.styles.css'

class UserCards extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            cards : [],
            count : 0,
            searchField: ''
        }           
    }

    componentDidMount(){
       this.getCards();
    }

    getCards = () => {
        console.log("Gettin New Cards");
        Axios.get('https://fullstackofcards.herokuapp.com/flashcards/getUserCards', {params: {userId : localStorage.getItem('user-id')}},
            {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        .then(data => {            
            return JSON.parse(data.request.response);
        })
        .then(cards => {
            this.setState({cards:cards})
            this.setState({count : cards.length})
        }).catch(error => {
            console.log(error)
        })
    }
    
    deleteCard = (id) => {
        Axios.delete('https://fullstackofcards.herokuapp.com/flashcards/removeCard/'+ id).then(data => this.getCards()).catch(error => console.log("Error deleting cards"));
        
        //this.setState({count : this.state.count - 1})
    }

    handleChange = (e) => {
        this.setState({searchField:e.target.value})
    }

    render() {        
        let filteredCards = this.state.cards.filter(card => {
            return card.question.toLowerCase().includes(this.state.searchField.toLowerCase()) || card.answer.toLowerCase().includes(this.state.searchField.toLowerCase());;
            
        })
        return  <div className="user-card-page">
                    <h2>My Cards</h2>
                    <input type='search' onChange={this.handleChange} placeholder='Search cards' />
                    <div className="user-cards">                        
                        {filteredCards.map(card => <UserCard key={card.id} className="user-card" flashCard={card} deleteCard={this.deleteCard}/>)}  
                    </div>
                </div>
    }
}

export default UserCards