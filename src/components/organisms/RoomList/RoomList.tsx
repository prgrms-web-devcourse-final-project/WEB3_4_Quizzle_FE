import type React from "react"
import Card from "../../atoms/Card/Card.tsx"
import RoomItem from "../../molecules/RoomItem/RoomItem.tsx"
import "./RoomList.scss"
import { Room } from "../../../types/response.ts"

export interface IRoomListProps {
    roomList: Room[]
    onQuizStart?: (quizId: string) => void
}

const RoomList: React.FC<IRoomListProps> = ({roomList, onQuizStart}: IRoomListProps) => {
    const titleStyle = {
        padding: "1rem",
        textAlign: "left" as const,
        marginBottom: 10
    }

    const itemsStyle = {
        overflowY: "scroll" as const,
    }

    return (
        <Card className="room-list-container">
            <h2 style={titleStyle}>{"방 목록"}</h2>
            <div style={itemsStyle}>
                {roomList.map((room) => (
                    <RoomItem
                        key={room.id}
                        title={room.title}
                        maxMember={room.capacity}
                        member={room.currentPlayers}
                        onStart={() => onQuizStart && onQuizStart(room.id.toString())}
                    />
                ))}
            </div>
        </Card>
    )
}

export default RoomList

