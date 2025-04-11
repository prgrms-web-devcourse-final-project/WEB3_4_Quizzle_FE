import type React from "react"
import Button from "../../../atoms/Button/Button.tsx"
import Avatar from "../../../atoms/Avatar/Avatar.tsx"
import { useDisclosure } from "@chakra-ui/react";
import CreateRoomModal from "../../../modal/CreateRoomModal.tsx";
import useUser from "../../../../hooks/user.ts";
import { RouteDispatchContext } from "../../../provider/RouteProvider.tsx";
import { useContext } from "react";
import { logout } from "../../../../services/remote/user.ts";

const LobbyHeader: React.FC = () => {


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

  const logoStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "0.5rem",
  }

  const logoIconStyle = {
    color: "#5e3bee",
  }

  const logoTextStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  }

  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.25rem",
  }

  const {
    open: isCreateRoomModalOpen,
    onClose: onCloseCreateRoomModal,
    onOpen: onOpenCreateRoomModal,
  } = useDisclosure();

  const { user: me, isLoading: isMeLoading, refetch: refetchMe } = useUser();

  const routerDispatch = useContext(RouteDispatchContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  if (isMeLoading) {
    return <div>Loading...</div>
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>
          <div style={logoIconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span style={logoTextStyle}>Quizzle</span>
        </div>

        <div style={actionsStyle}>
          <Button onClick={onOpenCreateRoomModal} variant="primary">방 만들기</Button>
          <Button variant="text" color={"black"} onClick={handleLogout}>Log out</Button>
          <Avatar onClick={() => {
            refetchMe();
            routerDispatch("PROFILE_SETTING");
          }} src={me?.avatarUrl} alt="User" />
        </div>
      </div>
      <CreateRoomModal isOpen={isCreateRoomModalOpen} onClose={onCloseCreateRoomModal} />
    </header>
  )
}

export default LobbyHeader

