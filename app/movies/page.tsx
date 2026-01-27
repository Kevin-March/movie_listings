"use client";

import React, { useEffect, useState } from "react";
import { getMovies, Movie } from "../../services/movie";
import SkeletonCard from "@/components/SkeletonCard";
import { useRouter } from "next/navigation";

const PAGE_SIZES = [5, 10, 20, 50];

const MoviesPage = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    fetchMovies();
  }, [page, pageSize]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const skip = (page - 1) * pageSize;

      const response = await fetch(
        `https://dummyjson.com/posts?limit=${pageSize}&skip=${skip}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      setMovies(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6" data-theme="luxury">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-center sm:text-left">Movies</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm whitespace-nowrap">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
          <select
            className="select select-bordered select-sm w-24"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => router.push(`/movie/${movie.id}`)}
                className="card bg-base-100 shadow-md border border-base-200 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="card-body">
                  <h2 className="card-title line-clamp-1">{movie.title}</h2>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {movie.body}
                  </p>

                  <div className="flex justify-between text-sm mt-4">
                    <span>👁 {movie.views}</span>
                    <div className="flex gap-2">
                      <span>👍 {movie.reactions.likes}</span>
                      <span>👎 {movie.reactions.dislikes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
