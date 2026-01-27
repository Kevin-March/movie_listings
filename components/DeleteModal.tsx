"use client";

import { FC } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar eliminación",
  message = "¿Estás seguro que quieres borrar este comentario? Esta acción no se puede deshacer.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button className="btn btn-outline" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
