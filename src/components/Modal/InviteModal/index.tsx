import useMultiPlayer from "../../../store/useMultiPlayer";
import useInviteModal from "../../../store/useInviteModal";
import { ModalOverlay } from "..";

import { shareLink } from "../../../lib/utils";

import styles from "./index.module.css";

const InviteModal = () => {
  const isOpen = useInviteModal((state) => state.isOpen);
  const roomId = useMultiPlayer((state) => state.roomId);

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <div className={styles.container}>
            <button
              onClick={() =>
                shareLink(
                  "Noughts and Royale: Share Game Link",
                  `/join/${roomId}`
                )
              }
            >
              Share Link
            </button>
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default InviteModal;
