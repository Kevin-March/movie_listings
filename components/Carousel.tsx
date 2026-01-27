"use client";

import { useState } from "react";
import { Movie } from "@/services/movie";
import { MovieModal } from "./MovieModal";
import { Eye } from "lucide-react";

function calculateRating(likes: number, dislikes: number) {
  const total = likes + dislikes;
  if (total === 0) return "0.0";
  return ((likes / total) * 10).toFixed(1);
}

export function MovieCarousel({ movies }: { movies: Movie[] }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {movies.map((movie) => {
            const rating = calculateRating(
              movie.reactions.likes,
              movie.reactions.dislikes,
            );

            return (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="min-w-[260px] bg-base-200 rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
              >
                <div className="h-[320px] bg-gradient-to-br from-neutral to-base-300 rounded-t-xl flex items-center justify-center text-6xl opacity-30">
                  🎬
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg line-clamp-1">
                    {movie.title}
                  </h3>

                  <p className="text-sm opacity-80 line-clamp-2">
                    {movie.body}
                  </p>

                  <div className="flex justify-between text-sm mt-2">
                    <span>★ {rating}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-base-content" />
                      <span>{movie.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
