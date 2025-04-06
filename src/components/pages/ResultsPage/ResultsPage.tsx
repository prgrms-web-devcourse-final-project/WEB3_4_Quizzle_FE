import type React from "react"
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import Button from "../../atoms/Button/Button.tsx";
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import "./ResultsPage.scss"

const ResultsPage: React.FC = () => {
  const buttonStyle = {
    width: "293px",
    height: "100px",
    fontSize: "30px"
  }

  // Mock data
  const players = [
    {
      id: "1",
      name: "Player 2",
      avatar: "/assets/avatars/avatar2.png",
      score: 300,
    },
    {
      id: "2",
      name: "You",
      avatar: "/assets/avatars/avatar1.png",
      score: 200,
    },
    {
      id: "3",
      name: "Player 1",
      avatar: "/assets/avatars/avatar3.png",
      score: 150,
    },
    {
      id: "4",
      name: "Player 4",
      avatar: "/assets/avatars/avatar4.png",
      score: 100,
    },
    {
      id: "5",
      name: "Player 6",
      avatar: "/assets/avatars/avatar6.png",
      score: 300,
    },
    {
      id: "6",
      name: "Player 8",
      avatar: "/assets/avatars/avatar8.png",
      score: 200,
    },
    {
      id: "7",
      name: "Player 5",
      avatar: "/assets/avatars/avatar5.png",
      score: 150,
    },
    {
      id: "8",
      name: "Player 7",
      avatar: "/assets/avatars/avatar7.png",
      score: 100,
    },{
      id: "5",
      name: "Player 6",
      avatar: "/assets/avatars/avatar6.png",
      score: 300,
    },
    {
      id: "6",
      name: "Player 8",
      avatar: "/assets/avatars/avatar8.png",
      score: 200,
    },
    {
      id: "7",
      name: "Player 5",
      avatar: "/assets/avatars/avatar5.png",
      score: 150,
    },
    {
      id: "8",
      name: "Player 7",
      avatar: "/assets/avatars/avatar7.png",
      score: 100,
    },
  ]

  const handlePlayAgain = () => {
    console.log("Play again")
  }

  const handleExit = () => {
    console.log("Exit")
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
      <AppTemplate header={
        <h1 className="results-page__title">퀴즈 결과</h1>} content={
        <div className="results-page">

          <div className="results-page__content">
            <PlayerList title="최종 순위" players={sortedPlayers}/>
          </div>

          <div className="results-page__actions">
            <Button style={buttonStyle} onClick={handlePlayAgain}>다시 플레이</Button>
            <Button style={buttonStyle} variant="secondary" onClick={handleExit}>
              나가기
            </Button>
          </div>
        </div>
      }/>

  )
}

export default ResultsPage

