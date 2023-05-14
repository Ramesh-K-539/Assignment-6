import './index.css'

import {Component} from 'react'
import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'

class AppContainer extends Component {
  state = {
    result: '',
    points: 0,
    opponentsImgUrl: '',
    ourImgUrl: '',
    isCheck: false,
  }

  onSelectOption = id => {
    const {list} = this.props
    const randNum = Math.floor(Math.random() * 3)

    const imgUrl = list[randNum].imageUrl
    const opponentId = list[randNum].id

    const our = list.filter(each => each.id === id)

    const {imageUrl} = our[0]

    this.setState({
      ourImgUrl: imageUrl,
      opponentsImgUrl: imgUrl,
      isCheck: true,
    })

    if (
      (id === 'ROCK' && opponentId === 'SCISSORS') ||
      (id === 'SCISSORS' && opponentId === 'PAPER') ||
      (id === 'PAPER' && opponentId === 'ROCK')
    ) {
      this.setState(prevState => ({
        points: prevState.points + 1,
        result: 'YOU WON',
      }))
    } else if (
      (id === 'SCISSORS' && opponentId === 'ROCK') ||
      (id === 'PAPER' && opponentId === 'SCISSORS') ||
      (id === 'ROCK' && opponentId === 'PAPER')
    ) {
      this.setState(prevState => ({
        points: prevState.points - 1,
        result: 'YOU LOSE',
      }))
    } else {
      this.setState({result: 'IT IS DRAW'})
    }
  }

  playAgain = () => {
    this.setState({isCheck: false})
  }

  render() {
    const {list} = this.props
    const {isCheck, opponentsImgUrl, ourImgUrl, result, points} = this.state
    return (
      <div className="app-container">
        <div className="points-table">
          <div className="ul-list">
            <h1 className="list-item">
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div className="points-container">
            <p className="heading">Score</p>
            <p className="paragraph">{points}</p>
          </div>
        </div>
        {isCheck ? (
          <>
            <div className="result-container">
              <div className="my-result-container">
                <p className="you-text">YOU</p>
                <img src={ourImgUrl} alt="your choice" className="img" />
              </div>
              <div className="my-result-container">
                <p className="you-text">OPPONENT</p>
                <img
                  src={opponentsImgUrl}
                  alt="opponent choice"
                  className="img"
                />
              </div>
            </div>
            <p className="match-result-text">{result}</p>
            <button
              className="play-again-btn"
              type="button"
              onClick={this.playAgain}
            >
              PLAY AGAIN
            </button>
          </>
        ) : (
          <ul className="ul-list-2">
            {list.map(each => (
              <li className="li-item" key={each.id}>
                <button
                  data-testid={each.testId}
                  type="button"
                  className="button"
                  onClick={() => this.onSelectOption(each.id)}
                >
                  <img src={each.imageUrl} alt={each.id} className="img" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <Popup
          modal
          trigger={
            <button className="trigger-button" type="button">
              RULES
            </button>
          }
          position="center center"
        >
          {close => (
            <div className="pop-up-container">
              <button
                className="close-button"
                type="button"
                data-testid="closeButton"
                onClick={() => close()}
              >
                <IoMdClose size="30" color="#616e7c" className="close-icon" />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default AppContainer
