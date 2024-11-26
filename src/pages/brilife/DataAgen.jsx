import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataAgen = () => {
  const [noLisensi, setNoLisensi] = useState("");
  const [namaAgen, setNamaAgen] = useState("");
  const [levelAgen, setLevelAgen] = useState(""); // Holds the level ID
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState(false); // Use boolean for checkbox
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch levels from the API
    axios
      .get("http://localhost:5000/levels")
      .then((response) => {
        console.log(levels)
        setLevels(response.data); // Assuming the API returns an array of levels
      })
      .catch((error) => {
        console.error("Error fetching levels:", error);
      });
  }, []);

  const saveAgen = async (e) => {
    e.preventDefault();
    const agenData = {
      no_lisensi: noLisensi,
      nama_agen: namaAgen,
      id_agen_level: parseInt(levelAgen, 10), // Ensure numeric value (level ID)
      status: status ? 1 : 0, // Convert boolean status to 1 (active) or 0 (inactive)
      status_tgl: "2021-01-01", // Example static date; update as needed
      wilayah_kerja: "Jakarta", // Example static value; update as needed
    };

    try {
      await axios.post("http://localhost:5000/agens", agenData);
      navigate("/"); // Redirect to home or another page after saving
    } catch (error) {
      console.error("Error saving agen:", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-4">
            <h5 className="card-header">Form Entry Data</h5>
            <form onSubmit={saveAgen}>
              <div className="card-body">
                <div className="mb-3 row">
                  <label htmlFor="noLisensi" className="col-md-2 col-form-label">
                    No. Lisensi
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      id="noLisensi"
                      value={noLisensi}
                      onChange={(e) => setNoLisensi(e.target.value)}
                      style={{ width: "50%" }}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="namaAgen" className="col-md-2 col-form-label">
                    Nama Agen
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      id="namaAgen"
                      value={namaAgen}
                      onChange={(e) => setNamaAgen(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="levelAgen" className="col-md-2 col-form-label">
                    Level Agen
                  </label>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      id="levelAgen"
                      value={levelAgen}
                      onChange={(e) => setLevelAgen(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Level
                      </option>
                      {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.keterangan} ({level.level})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="status" className="col-md-2 col-form-label">
                    Status
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="status"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="status">
                      &nbsp;Aktif
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <button
                      aria-label="Click me"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAgen;
