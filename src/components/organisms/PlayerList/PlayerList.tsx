import type React from "react"
import Card from "../../atoms/Card/Card"
import PlayerItem from "../../molecules/PlayerItem/PlayerItem"

import './PlayerList.scss';

export interface Player {
    id: string
    name: string
    avatar?: string
    isReady?: boolean
    score?: number
}

export interface PlayerListProps {
    title?: string;
    type?: "grid" | "list";
    players: Player[];
    maxPlayers?: number;
}

const PlayerList: React.FC<PlayerListProps> = ({title, type, players, maxPlayers}) => {
    const titleContainerStyle = {
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #dee2e6",
    }

    const titleStyle = {
        padding: "1rem",
        textAlign: "left" as const,
        marginBottom: 0
    }

    const renderTitle = () => {
        const titleComponents = [];

        if (title) {
            titleComponents.push(<h2 key="player-list-title" style={titleStyle}>{title}</h2>);
        }

        if (maxPlayers) {
            titleComponents.push(<h3 key="player-list-count" style={titleStyle}>{`${players.length} / ${maxPlayers}`}</h3>);
        }

        if (titleComponents.length === 0) {
            return;
        }

        return <div style={titleContainerStyle}>
            {titleComponents}
        </div>
    }

    const getItemStyle = (type: PlayerListProps["type"]) => {
        if (type === "grid") {
            return {
                padding: "1rem",
                display: "grid",
                gap: "0.75rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(20%, auto))",
                gridTemplateRows: "repeat(auto-fill, minmax(10%, auto))",
                overFlowY: "auto" as const
            }
        }

        return {
            padding: "1rem",
            display: "flex",
            flexDirection: "column" as const,
            overflowY: "auto" as const,
            gap: "0.75rem"
        }
    }

    return (
        <Card className="player-list-container">
            {renderTitle()}
            <div style={getItemStyle(type)}>
                {players.map((player, index) => (
                    <PlayerItem
                        key={`player-${player.id}-${player.name}`}
                        userId={player.id}
                        name={player.name}
                        avatar={player.avatar}
                        isReady={player.isReady}
                        score={player.score}
                        rank={index + 1}
                    />
                ))}
            </div>
        </Card>
    )
}

export default PlayerList

