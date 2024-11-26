import { useState, useEffect } from "react";
import axios from "axios";

export const DashboardAgen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get("http://localhost:5000/agenStrukturs") // Replace with your API endpoint
      .then((response) => {
        setData(response.data); // Assuming the API returns the data array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h5 className="card-header">Table Basic</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>No. Lisensi</th>
                    <th>Nama Agen</th>
                    <th>Wilayah Kerja</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      {/* Replace `no_lisensi` with actual data if available */}
                      <td>{item.no_lisensi || 'Not Available'}</td>
                      {/* Replace `nama_agen` with actual agent name */}
                      <td>{item.id_agen ? `Agent ${item.id_agen}` : 'Unknown'}</td>
                      {/* Replace `wilayah_kerja` with actual data if available */}
                      <td>{item.wilayah_kerja || 'Unknown'}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "A"
                              ? "bg-label-success"
                              : "bg-label-danger"
                          } me-1`}
                        >
                          {item.status === "A" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                aria-label="Edit action"
                              >
                                <i className="bx bx-edit-alt me-1"></i> Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                aria-label="Delete action"
                              >
                                <i className="bx bx-trash me-1"></i> Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
