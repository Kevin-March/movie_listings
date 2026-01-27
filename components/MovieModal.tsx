"use client";

import Link from "next/link";
import { Movie } from "@/services/movie";

interface Props {
  movie: Movie | null;
  onClose: () => void;
}

function calculateRating(likes: number, dislikes: number) {
  const total = likes + dislikes;
  if (total === 0) return "0.0";
  return ((likes / total) * 10).toFixed(1);
}

export function MovieModal({ movie, onClose }: Props) {
  if (!movie) return null;

  const rating = calculateRating(
    movie.reactions.likes,
    movie.reactions.dislikes,
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl opacity-60 hover:opacity-100"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-3">{movie.title}</h2>

        <p className="text-sm opacity-80 mb-4">{movie.body}</p>

        <div className="flex justify-between text-sm mb-4">
          <span>⭐ {rating}</span>
          <span>👁 {movie.views}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {movie.tags.map((tag) => (
              <span key={tag} className="badge badge-outline">
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/movie/${movie.id}`}
            className="text-sm font-semibold underline hover:text-primary"
            onClick={onClose}
          >
            Ver comentarios
          </Link>
        </div>
      </div>
    </div>
  );
}
