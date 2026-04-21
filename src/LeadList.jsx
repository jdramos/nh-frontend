import React, { useEffect, useMemo, useState } from "react";
import { getLeads, updateLeadStatus } from "./api/leads";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "WON", "LOST"];

const statusStyles = {
  NEW: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },
  CONTACTED: {
    background: "#fef3c7",
    color: "#b45309",
  },
  WON: {
    background: "#dcfce7",
    color: "#15803d",
  },
  LOST: {
    background: "#fee2e2",
    color: "#b91c1c",
  },
};

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [lastLeadId, setLastLeadId] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playNotificationSound = () => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio("/notify.mp3");
      audio.play().catch(() => {});
    } catch (error) {
      console.error("No se pudo reproducir sonido:", error);
    }
  };

  const loadLeads = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      setError("");
      const data = await getLeads();
      const rows = Array.isArray(data) ? data : data?.data || [];

      if (rows.length > 0) {
        const newestId = rows[0].id;

        if (lastLeadId !== null && newestId > lastLeadId) {
          const incoming = rows.filter(
            (x) => x.id > lastLeadId && x.status === "NEW"
          ).length;

          if (incoming > 0) {
            setNewLeadCount((prev) => prev + incoming);
            playNotificationSound();
          }
        }

        if (lastLeadId === null || newestId > lastLeadId) {
          setLastLeadId(newestId);
        }
      }

      setLeads(rows);
    } catch (err) {
      setError(err.message || "Error al cargar leads");
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadLeads(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadLeads(true);
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLeadId, soundEnabled]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setStatusLoadingId(id);
      await updateLeadStatus(id, newStatus);

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      alert(err.message || "No se pudo actualizar");
    } finally {
      setStatusLoadingId(null);
    }
  };

  const openWhatsApp = async (lead) => {
    let phone = String(lead.phone || "").replace(/\D/g, "");

    if (!phone) {
      alert("Este lead no tiene teléfono válido.");
      return;
    }

    if (!phone.startsWith("505")) {
      phone = `505${phone}`;
    }

    const text = encodeURIComponent(
      `Hola ${lead.name || ""}, te escribe Nicaragua Hosting. Vimos tu interés en ${
        lead.plan || "nuestros servicios"
      } y queremos ayudarte.`
    );

    try {
      if (lead.status === "NEW") {
        await updateLeadStatus(lead.id, "CONTACTED");
        setLeads((prev) =>
          prev.map((item) =>
            item.id === lead.id ? { ...item, status: "CONTACTED" } : item
          )
        );
      }
    } catch (error) {
      console.error(error);
    }

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("nh_token");
    localStorage.removeItem("nh_user");
    window.location.href = "/login";
  };

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchStatus =
        statusFilter === "ALL" ? true : lead.status === statusFilter;

      const matchText =
        !term ||
        String(lead.name || "").toLowerCase().includes(term) ||
        String(lead.email || "").toLowerCase().includes(term) ||
        String(lead.phone || "").toLowerCase().includes(term) ||
        String(lead.plan || "").toLowerCase().includes(term) ||
        String(lead.message || "").toLowerCase().includes(term);

      return matchStatus && matchText;
    });
  }, [leads, search, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: leads.length,
      newCount: leads.filter((x) => x.status === "NEW").length,
      contacted: leads.filter((x) => x.status === "CONTACTED").length,
      won: leads.filter((x) => x.status === "WON").length,
      lost: leads.filter((x) => x.status === "LOST").length,
    };
  }, [leads]);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
      color: "#0f172a",
    },
    container: {
      maxWidth: "1300px",
      margin: "0 auto",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "16px",
      flexWrap: "wrap",
    },
    title: {
      margin: 0,
      fontSize: "32px",
      fontWeight: 700,
    },
    subtitle: {
      marginTop: "8px",
      color: "#475569",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginTop: "24px",
      marginBottom: "24px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
      border: "1px solid #e2e8f0",
    },
    controls: {
      display: "grid",
      gridTemplateColumns: "1fr 220px 140px",
      gap: "12px",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid #cbd5e1",
      boxSizing: "border-box",
      fontSize: "14px",
      background: "#fff",
    },
    button: {
      background: "#0f172a",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "12px 16px",
      cursor: "pointer",
      fontWeight: 700,
    },
    tableWrap: {
      overflowX: "auto",
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
      border: "1px solid #e2e8f0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1250px",
    },
    th: {
      textAlign: "left",
      padding: "14px",
      background: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
      fontSize: "13px",
    },
    td: {
      padding: "14px",
      borderBottom: "1px solid #eef2f7",
      verticalAlign: "top",
      fontSize: "14px",
    },
    chip: (status) => ({
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 700,
      ...(statusStyles[status] || {
        background: "#e2e8f0",
        color: "#334155",
      }),
    }),
    empty: {
      padding: "28px",
      textAlign: "center",
      color: "#64748b",
    },
    error: {
      background: "#fee2e2",
      color: "#991b1b",
      padding: "12px 14px",
      borderRadius: "12px",
      marginBottom: "16px",
    },
    notification: {
      marginTop: "16px",
      marginBottom: "18px",
      background: "#dcfce7",
      color: "#166534",
      padding: "12px 14px",
      borderRadius: "12px",
      fontWeight: 700,
      display: "inline-flex",
      gap: "10px",
      alignItems: "center",
    },
    smallButton: {
      border: "none",
      background: "#166534",
      color: "#fff",
      borderRadius: "8px",
      padding: "6px 10px",
      cursor: "pointer",
      fontWeight: 700,
    },
    whatsappButton: {
      background: "#16a34a",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: 700,
    },
    topActions: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    toggleWrap: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#334155",
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "10px 12px",
    },
    logoutButton: {
      background: "#991b1b",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "12px 16px",
      cursor: "pointer",
      fontWeight: 700,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Leads de Nicaragua Hosting</h1>
            <div style={styles.subtitle}>
              Administra contactos interesados en dominios y correo empresarial.
            </div>

            {newLeadCount > 0 ? (
              <div style={styles.notification}>
                🔔 Tienes {newLeadCount} lead{newLeadCount > 1 ? "s" : ""} nuevo
                {newLeadCount > 1 ? "s" : ""}
                <button
                  onClick={() => setNewLeadCount(0)}
                  style={styles.smallButton}
                >
                  OK
                </button>
              </div>
            ) : null}
          </div>

          <div style={styles.topActions}>
            <label style={styles.toggleWrap}>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              Sonido
            </label>

            <button style={styles.logoutButton} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        <div style={styles.summaryGrid}>
          <div style={styles.card}>
            <div style={{ fontSize: 13, color: "#64748b" }}>Total</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary.total}</div>
          </div>
          <div style={styles.card}>
            <div style={{ fontSize: 13, color: "#64748b" }}>Nuevos</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary.newCount}</div>
          </div>
          <div style={styles.card}>
            <div style={{ fontSize: 13, color: "#64748b" }}>Contactados</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary.contacted}</div>
          </div>
          <div style={styles.card}>
            <div style={{ fontSize: 13, color: "#64748b" }}>Ganados</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary.won}</div>
          </div>
          <div style={styles.card}>
            <div style={{ fontSize: 13, color: "#64748b" }}>Perdidos</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{summary.lost}</div>
          </div>
        </div>

        {error ? <div style={styles.error}>{error}</div> : null}

        <div style={styles.controls}>
          <input
            style={styles.input}
            type="text"
            placeholder="Buscar por nombre, correo, teléfono, plan o mensaje"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            style={styles.input}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Todos los estados</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            style={styles.button}
            onClick={() => {
              setNewLeadCount(0);
              loadLeads(false);
            }}
          >
            Recargar
          </button>
        </div>

        {loading ? (
          <div style={styles.card}>Cargando leads...</div>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Correo</th>
                  <th style={styles.th}>Teléfono</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Mensaje</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Cambiar estado</th>
                  <th style={styles.th}>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={styles.empty}>
                      No hay leads para mostrar.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={styles.td}>{lead.id}</td>
                      <td style={styles.td}>{lead.name}</td>
                      <td style={styles.td}>{lead.email}</td>
                      <td style={styles.td}>{lead.phone}</td>
                      <td style={styles.td}>{lead.plan || "-"}</td>
                      <td style={styles.td}>
                        <div style={{ maxWidth: 280, whiteSpace: "pre-wrap" }}>
                          {lead.message}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.chip(lead.status)}>{lead.status}</span>
                      </td>
                      <td style={styles.td}>
                        {lead.created_at
                          ? new Date(lead.created_at).toLocaleString()
                          : "-"}
                      </td>
                      <td style={styles.td}>
                        <select
                          style={styles.input}
                          value={lead.status}
                          disabled={statusLoadingId === lead.id}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value)
                          }
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.whatsappButton}
                          onClick={() => openWhatsApp(lead)}
                        >
                          Abrir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}