import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "./api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await loginRequest(form.username, form.password);

      localStorage.setItem("nh_token", data.token);
      localStorage.setItem("nh_user", JSON.stringify(data.user));

      navigate("/leads");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 380,
          background: "#fff",
          padding: 28,
          borderRadius: 18,
          boxShadow: "0 10px 24px rgba(15,23,42,.08)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login admin</h2>

        {error ? (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: 12,
              borderRadius: 12,
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        ) : null}

        <div style={{ display: "grid", gap: 12 }}>
          <input
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange("username")}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange("password")}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              background: "#0f172a",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}