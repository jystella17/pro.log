
import Modal from 'react-modal'

const customModal = Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '600px',
    height: '400px',
    zIndex: '20',
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
    padding: "40px"
  }
}

// 모달창에 들어갈 content 함수 생성해서 modalContent에 넣으시면 됩니다.


export default function ModalPage({isOpen, onRequestClose, children, contentLabel}) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModal}
      contentLabel={contentLabel}
    >
      {children}
    </Modal>
  )
}