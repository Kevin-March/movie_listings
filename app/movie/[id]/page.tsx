"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getMovieById, getMovieComments } from "@/services/movie";
import { createComment, editComment, deleteComment } from "@/services/comment";
import CommentModal from "@/components/CommentModal";
import { useAuth } from "@/app/context/AuthContext";
import DeleteModal from "@/components/DeleteModal";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import SkeletonMovie from "@/components/SkeletonMovie";

type Comment = {
  id: number;
  body: string;
  postId: number;
  userId: number;
  userName: string;
  likes: number;
};

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params?.id);
  const { user, isLoggedIn } = useAuth();

  const [movie, setMovie] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);

  // Cargar datos al montar
  useEffect(() => {
    async function fetchData() {
      const [movieData, commentsData] = await Promise.all([
        getMovieById(movieId),
        getMovieComments(movieId),
      ]);

      setMovie(movieData);

      // Mapeamos para unificar la propiedad userName
      const mappedComments = commentsData.comments.map((c: any) => ({
        id: c.id,
        body: c.body,
        postId: c.postId,
        userId: c.user.id,
        userName: c.user?.fullName || "Desconocido",
        likes: c.likes,
      }));

      setComments(mappedComments);
    }

    fetchData();
  }, [movieId]);

  if (!movie) return <SkeletonMovie />;

  const calculateRating = (likes: number, dislikes: number) => {
    const total = likes + dislikes;
    if (total === 0) return "0.0";
    return ((likes / total) * 10).toFixed(1);
  };

  const calculateCriticScore = (likes: number) => {
    if (likes >= 10) return 5;
    if (likes >= 7) return 4;
    if (likes >= 4) return 3;
    if (likes >= 2) return 2;
    return 1;
  };

  // Abrir modal para crear o editar comentario
  const handleOpenModal = (comment?: Comment) => {
    setEditingComment(comment || null);
    setIsModalOpen(true);
  };

  // Crear o editar comentario
  const handleSubmit = async (body: string) => {
    if (!user) return;

    if (editingComment) {
      // Editar comentario
      const updatedComment: Comment = { ...editingComment, body };
      setComments((prev) =>
        prev.map((c) => (c.id === editingComment.id ? updatedComment : c)),
      );
      setEditingComment(null);
      setIsModalOpen(false);

      try {
        await editComment(editingComment.id, body);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Crear comentario
      const newComment: Comment = {
        id: Date.now(), // Temporal
        body,
        postId: movieId,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        likes: 0,
      };

      // Agregar al final de la lista (o al inicio si querés los más recientes arriba)
      setComments((prev) => [...prev, newComment]);
      setIsModalOpen(false);

      try {
        await createComment({ body, postId: movieId, userId: user.id });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleOpenDeleteModal = (id: number) => {
    setDeleteCommentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteCommentId === null) return;

    setComments((prev) => prev.filter((c) => c.id !== deleteCommentId));

    try {
      await deleteComment(deleteCommentId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteCommentId(null);
    }
  };
  const rating = calculateRating(
    movie.reactions.likes,
    movie.reactions.dislikes,
  );

  return (
    <div
      className="min-h-screen px-6 py-10 max-w-4xl mx-auto"
      data-theme="luxury"
    >
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

      <div className="flex gap-6 text-sm opacity-80 mb-6">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-primary" />
            <span>{movie.reactions.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4 text-error" />
            <span>{movie.reactions.dislikes}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-base-content" />
          <span>{movie.views}</span>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-8">{movie.body}</p>

      <div className="flex flex-wrap gap-2 mb-12">
        {movie.tags.map((tag: string) => (
          <span key={tag} className="badge badge-outline">
            {tag}
          </span>
        ))}
      </div>

      {/* Sección de Críticas */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Críticas ({comments.length})</h2>

          {isLoggedIn && (
            <button
              className="btn btn-primary"
              onClick={() => handleOpenModal()}
            >
              Dejar comentario
            </button>
          )}
        </div>

        <div className="space-y-6">
          {comments
            .sort((a, b) => b.likes - a.likes)
            .map((c) => {
              const score = calculateCriticScore(c.likes);
              return (
                <div key={c.id} className="p-5 bg-base-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(score)}
                      {"☆".repeat(5 - score)}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-primary" />
                      <span className="text-xs opacity-60">{c.likes}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-3">“{c.body}”</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-60">— {c.userName}</span>

                    {user?.id === c.userId && (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => handleOpenModal(c)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleOpenDeleteModal(c.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingComment(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
        initialBody={editingComment?.body || ""}
        title={editingComment ? "Editar comentario" : "Dejar comentario"}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
