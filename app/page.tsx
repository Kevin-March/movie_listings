import Link from "next/link";
import { getMovies, getMoviesByTag } from "@/services/movie";
import { MovieCarousel } from "@/components/Carousel";
import { Flame, Flag, Rocket, Film } from "lucide-react";

export default async function HomePage() {
  const [popularToday, englishMovies, fictionMovies] = await Promise.all([
    getMovies({ limit: 10, skip: 0 }),
    getMoviesByTag("english", 10),
    getMoviesByTag("fiction", 10),
  ]);

  return (
    <div
      className="min-h-screen bg-base-100 text-base-content px-6 py-10"
      data-theme="luxury"
    >
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-5xl font-bold">
          Descubre que películas son tendencia global
        </h1>

        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Visitas, reacciones y mucho más. Mantente al día con las últimas
          tendencias.
        </p>

        <Link href="/movies" className="btn btn-primary btn-lg">
          Descubre todas las películas a disposición
        </Link>
      </div>

      <section className="space-y-20">
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Flame className="w-7 h-7 text-primary" />
            Popular hoy
          </h2>
          <MovieCarousel movies={popularToday} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Flag className="w-7 h-7 text-primary" />
            Películas en inglés
          </h2>
          <MovieCarousel movies={englishMovies} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="w-7 h-7 text-primary" />
            Top ficción
          </h2>
          <MovieCarousel movies={fictionMovies} />
        </div>
      </section>

      <div className="text-center mt-24">
        <Link
          href="/movies"
          className="text-lg font-semibold underline hover:text-primary"
        >
          Ver más...
        </Link>
      </div>
    </div>
  );
}
