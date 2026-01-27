"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMovieSearch, Movie } from "@/services/movie";
import SkeletonSearch from "@/components/SkeletonSearch";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    getMovieSearch(query)
      .then((data) => setResults(data.posts))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6" data-theme="luxury">
      <h2 className="text-2xl font-bold mb-6">
        Results for: <span className="text-primary">{query}</span>
      </h2>

      {loading && <SkeletonSearch />}

      {!loading && results.length === 0 && <p>No results found.</p>}

      <div className="flex flex-col gap-3">
        {results.map((post) => (
          <div
            key={post.id}
            className="bg-base-100 border border-base-300 rounded-lg px-4 py-3 hover:bg-base-200 transition"
          >
            {/* Título */}
            <h3 className="text-lg font-semibold leading-tight">
              {post.title}
            </h3>

            {/* Descripción corta */}
            <p className="text-sm opacity-80 mt-1 line-clamp-2">{post.body}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="badge badge-sm badge-outline">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats + acción */}
            <div className="flex items-center justify-between mt-3 text-xs opacity-70">
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-primary" />
                    <span>{post.reactions.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4 text-error" />
                    <span>{post.reactions.dislikes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-base-content" />
                  <span>{post.views}</span>
                </div>
              </div>

              <a href={`/movie/${post.id}`} className="btn btn-xs btn-primary">
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
