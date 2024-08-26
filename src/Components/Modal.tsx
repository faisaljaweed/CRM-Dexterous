import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  minWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalsProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode; // Using children prop for dynamic content
}

export const Modals: React.FC<ModalsProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children} {/* Render dynamic content here */}
      </Box>
    </Modal>
  );
};
