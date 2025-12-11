import { useEffect, useMemo, useState } from "react";
import "./Dachbord.css";
import { Header, Footer } from "../Index";


export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nameQuery, setNameQuery] = useState("");
  const [conditionQuery, setConditionQuery] = useState("");

  useEffect(() => {
    const abort = new AbortController();

    fetch("https://mydentclinic.site/api/patients", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer 2|Jv2P7w9F5DCKCikjsAsbtSwsRrIy9GXtHAoc3bWi5670ee63",
        Accept: "application/json",
      },
      signal: abort.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPatients(data.data || []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Error");
      })
      .finally(() => setLoading(false));

    return () => abort.abort();
  }, []);

  const filtered = useMemo(() => {
    const nameLower = nameQuery.trim().toLowerCase();
    const condLower = conditionQuery.trim().toLowerCase();

    return patients.filter((p) => {
      const nameOk = !nameLower || (p.name || "").toLowerCase().includes(nameLower);
      const condOk =
        !condLower || (p.other_midical_condition || "").toLowerCase().includes(condLower);
      return nameOk && condOk;
    });
  }, [patients, nameQuery, conditionQuery]);



  return (
    <div className="dashboard">
      <Header total={patients.length} />

      <div className="controls">  Search here :
        <div className="search-group">
          <input
            className="search-input"
            placeholder="Search by name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            aria-label="Search by name"
          />

          <input
            className="search-input"
            placeholder="Filter by condition"
            value={conditionQuery}
            onChange={(e) => setConditionQuery(e.target.value)}
            aria-label="Filter by medical condition"
          />
        </div>

        <div className="actions">

          <button onClick={() => { setNameQuery(""); setConditionQuery(""); }}>
            Clear
          </button>
        </div>
      </div>

      {loading && <div className="info">Loading patients…</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="patients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Adress</th>
                <th>Other Medical Condition</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="empty">
                      No patients found
                    </td>
                  </tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.sex}</td>
                  <td>{p.email}</td>
                  <td>{p.mobile}</td>
                  <td>{p.adress}</td>
                  <td>
                    {(() => {
                      const raw = (p.other_midical_condition || "").toString().trim();
                      const key = raw.toLowerCase();
                      if (key === "نخر") return <span className="status status-nk">نخر</span>;
                      if (key === "قلع") return <span className="status status-ql">قلع</span>;
                      if (key === "no" || key === "none" || key === "") return <span className="status status-none">no</span>;
                      return <span className="status status-other">{raw}</span>;
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </div>
  );
}
