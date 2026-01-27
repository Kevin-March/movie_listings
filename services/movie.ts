interface Movie {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
interface MovieParams {
  limit?: number;
  skip?: number;
}
interface MoviesResponse {
  posts: Movie[];
  total: number;
  skip: number;
  limit: number;
}

export async function getMovies({
  limit = 10,
  skip = 0,
}: MovieParams): Promise<Movie[]> {
  const response = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();

  console.log("Movies data:", data);
  return data.posts;
}

export async function getMoviesByTag(
  tag: string,
  limit = 10,
  skip = 0,
): Promise<Movie[]> {
  const res = await fetch(
    `https://dummyjson.com/posts/tag/${tag}?limit=${limit}&skip=${skip}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies by tag");
  }

  const data: MoviesResponse = await res.json();
  return data.posts;
}

export async function getMovieById(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}
export async function getMovieComments(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

export async function getMovieSearch(query: string): Promise<MoviesResponse> {
  const res = await fetch(
    `https://dummyjson.com/posts/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching movie search");
  }

  return res.json();
}
export type { Movie };
