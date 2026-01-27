import { getMovieById, getMovieComments } from "@/services/movie";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function calculateRating(likes: number, dislikes: number) {
  const total = likes + dislikes;
  if (total === 0) return "0.0";
  return ((likes / total) * 10).toFixed(1);
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params; // 👈 CLAVE
  const movieId = Number(id);

  const [movie, commentsData] = await Promise.all([
    getMovieById(movieId),
    getMovieComments(movieId),
  ]);

  const rating = calculateRating(
    movie.reactions.likes,
    movie.reactions.dislikes,
  );

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

      <div className="flex gap-6 text-sm opacity-80 mb-6">
        <span>⭐ {rating}</span>
        <span>👁 {movie.views}</span>
        <span>👤 Autor ID: {movie.userId}</span>
      </div>

      <p className="text-lg leading-relaxed mb-8">{movie.body}</p>

      <div className="flex flex-wrap gap-2 mb-12">
        {movie.tags.map((tag: string) => (
          <span key={tag} className="badge badge-outline">
            {tag}
          </span>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Comentarios ({commentsData.comments.length})
        </h2>

        <div className="space-y-4">
          {commentsData.comments.map((comment: any) => (
            <div key={comment.id} className="p-4 bg-base-200 rounded-lg">
              <p className="text-sm mb-2">{comment.body}</p>
              <span className="text-xs opacity-60">
                — {comment.user.username}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
