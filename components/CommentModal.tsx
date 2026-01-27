"use client";

import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  initialBody?: string;
  onClose: () => void;
  onSubmit: (body: string) => void;
  title?: string;
};

export default function CommentModal({
  isOpen,
  initialBody = "",
  onClose,
  onSubmit,
  title = "Dejar comentario",
}: Props) {
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setBody(initialBody);
  }, [isOpen, initialBody]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <textarea
          className="textarea textarea-bordered w-full mb-4"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribí tu comentario..."
        />

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onSubmit(body);
              onClose();
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
