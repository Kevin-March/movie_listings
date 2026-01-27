"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import CommentModal from "./CommentModal";

type Props = {
  onSubmit: (body: string) => void;
};

export default function CommentButton({ onSubmit }: Props) {
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoggedIn) return null;

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Dejar comentario
      </button>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      />
    </>
  );
}
