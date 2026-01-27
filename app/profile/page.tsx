"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, User as UserFromService } from "@/services/user";
import { useAuth } from "@/app/context/AuthContext";
import ProfileSkeleton from "@/components/SkeletonProfile";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;

        const data: UserFromService = await getUserProfile(refreshToken);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          username: data.username || "",
        });

        setUser({
          ...user,
          ...data,
          gender: data.gender || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Datos actualizados localmente (no persistentes)");

    setUser((prev: any) => ({ ...prev, ...formData }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="flex justify-center mt-16" data-theme="luxury">
      <div className="relative w-full max-w-xl bg-base-200 rounded-2xl shadow-xl border border-base-300 pt-16 px-6 pb-8">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-4">
              <img
                src={user?.image || "/avatar-placeholder.png"}
                alt="User avatar"
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Mi Perfil</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Apellido</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Usuario</span>
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
