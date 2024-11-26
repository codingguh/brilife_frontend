import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataAgenStruktur = () => {
  const [noLisensi, setNoLisensi] = useState("");
  const [namaAgen, setNamaAgen] = useState(""); // Store ID of selected agent
  const [atasan, setAtasan] = useState(""); // Holds the superior's ID
  const [levelAgen, setLevelAgen] = useState(""); // Add state for levelAgen
  const [levels, setLevels] = useState([]);
  const [agens, setAgens] = useState([]); // Holds the list of agents
  const [status, setStatus] = useState(false); // Use boolean for checkbox
  const [berlakuMulai, setBerlakuMulai] = useState("2021-01-01");
  const [berlakuAkhir, setBerlakuAkhir] = useState("2021-01-01");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch agent levels from the API
    axios
      .get("http://localhost:5000/levels")
      .then((response) => {
        setLevels(response.data); // Assuming the API returns an array of levels
      })
      .catch((error) => {
        console.error("Error fetching levels:", error);
      });

    // Fetch agents from the API
    axios
      .get("http://localhost:5000/agens")
      .then((response) => {
        setAgens(response.data); // Assuming the API returns an array of agents
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  useEffect(() => {
    // Set the atasan when agent is selected
    if (namaAgen) {
      const selectedAgen = agens.find((agen) => agen.id === parseInt(namaAgen));
      if (selectedAgen) {
        setLevelAgen(selectedAgen.id_agen_level); // Set the agent's level
        setAtasan(selectedAgen.id_agen_level); // Initially, set atasan to same level (could be adjusted based on your logic)
      }
    }
  }, [namaAgen, agens]);

  const saveAgen = async (e) => {
    e.preventDefault();
    const agenData = {
      no_lisensi: noLisensi,
      nama_agen: namaAgen, // Use ID of selected agent
      id_agen: parseInt(levelAgen, 7), // Ensure numeric value (level ID)
      id_atasan: parseInt(atasan, 10), // Add superior's level ID
      berlaku_mulai: berlakuMulai, // Dynamic date value
      berlaku_akhir: berlakuAkhir, // Dynamic date value
      status: status ? "A" : "I", // Convert boolean status to "A" (Active) or "I" (Inactive)
      wilayah_kerja: "Jakarta", // Example static value; update as needed
      keterangan: "", // Example static value; update as needed
    };

    try {
      // Updated the endpoint to match the provided one
      await axios.post("http://localhost:5000/agenStrukturs", agenData);
      navigate("/"); // Redirect to home or another page after saving
    } catch (error) {
      console.error("Error saving agen:", error);
      alert(`Error saving data: ${error.message}`); // Show error message using alert
    }
  };

  // Filter agents based on the level of the selected agent to populate the atasan options
  const availableAtasan = agens.filter(
    (agen) => agen.id_agen_level === levelAgen && agen.id !== parseInt(namaAgen)
  );

  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-4">
            <h5 className="card-header">Form Entry Data</h5>
            <form onSubmit={saveAgen}>
              <div className="card-body">
                <div className="mb-3 row">
                  <label htmlFor="namaAgen" className="col-md-2 col-form-label">
                    Pilih Nama Agen
                  </label>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      id="namaAgen"
                      value={namaAgen}
                      onChange={(e) => setNamaAgen(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Agen
                      </option>
                      {agens.map((agen) => (
                        <option key={agen.id} value={agen.id}>
                          {agen.nama_agen}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="atasan" className="col-md-2 col-form-label">
                    Nama Atasan
                  </label>
                  <div className="col-md-10">
                    <select
                      className="form-select"
                      id="atasan"
                      value={atasan}
                      onChange={(e) => setAtasan(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Atasan
                      </option>
                      {availableAtasan.map((agen) => (
                        <option key={agen.id} value={agen.id}>
                          {agen.nama_agen}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="berlakuMulai" className="col-md-2 col-form-label">
                    Mulai Berlaku
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      value={berlakuMulai}
                      onChange={(e) => setBerlakuMulai(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="berlakuAkhir" className="col-md-2 col-form-label">
                    Akhir Berlaku
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      value={berlakuAkhir}
                      onChange={(e) => setBerlakuAkhir(e.target.value)}
                    />
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

export default DataAgenStruktur;
