"use client";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false); // ✅

  useEffect(() => {
    setMounted(true); // Solo renderizamos después de montar en cliente
  }, []);

  const handleLogin = () => {
    router.replace("/login");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="navbar bg-base-200 px-6 py-4" data-theme="luxury">
      <div className="flex-1">
        <h1
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => router.replace("/")}
        >
          MovieDB
        </h1>
      </div>

      <div className="flex-none gap-4 items-center">
        <input
          type="text"
          placeholder="Search movies, series..."
          className="input input-bordered w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />

        {mounted && // ✅ render solo en cliente
          (!isLoggedIn ? (
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt={`${user?.firstName} ${user?.lastName}`}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a href="/profile">Ver cuenta</a>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </header>
  );
}
