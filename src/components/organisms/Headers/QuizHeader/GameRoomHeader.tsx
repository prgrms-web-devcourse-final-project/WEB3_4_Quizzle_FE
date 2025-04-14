import Button from "../../../atoms/Button/Button.tsx"

interface GameRoomHeaderProps {
    roomId: string;
    onStart: () => void;
    onLeave: () => void;
}

const GameRoomHeader = ({roomId, onStart, onLeave}: GameRoomHeaderProps) => {
    // Inline styles to replace SCSS
    const headerStyle = {
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    }

    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0.75rem 1rem",
    }

    const actionsStyle = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "0.75rem",
    }

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                <h2 className="game-room-template__title">Room #{roomId}</h2>
                <div style={actionsStyle}>
                    {/* <Button onClick={onStart}>친구 초대</Button> */}
                    <Button variant="secondary" onClick={onLeave}>
                        방 나가기
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default GameRoomHeader;

