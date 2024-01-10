import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const CustomModal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="modal-title">
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomModal;
