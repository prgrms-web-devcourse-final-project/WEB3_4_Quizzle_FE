import type React from "react"
import Card from "../../atoms/Card/Card.tsx"
import RoomItem from "../../molecules/RoomItem/RoomItem.tsx"
import "./RoomList.scss"

export interface Room {
    id: string;
    title: string;
    description: string;
    maxMember: number;
    member: number;
}

export interface IRoomListProps {
    roomList: Room[]
    onQuizStart?: (quizId: string) => void
}

const RoomList: React.FC<IRoomListProps> = ({roomList, onQuizStart}) => {
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
                        description={room.description}
                        maxMember={room.maxMember}
                        member={room.member}
                        onStart={() => onQuizStart && onQuizStart(room.id)}
                    />
                ))}
            </div>
        </Card>
    )
}

export default RoomList

