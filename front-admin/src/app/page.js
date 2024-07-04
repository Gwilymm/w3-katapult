"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from './home.module.css';

export default function Home() {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get("http://localhost:3001/api/project/all", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => setApplications(response.data))
      .catch((error) => {
        console.error("Error fetching applications:", error);
        if (error.response && error.response.status === 401) {
          router.push("/login");
        }
      });
  }, [router]);

  const downloadPDF = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/api/project/generate-pdf/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const { filePath } = response.data;
        const url = `http://localhost:3001/${filePath}`;
        window.open(url, "_blank");
      })
      .catch((error) => console.error("Error fetching PDF path:", error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des candidatures</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Utilisateur</th>
            <th>Année de candidature</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.userId}</td>
              <td>{application.applicationYear}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => downloadPDF(application.id)}
                >
                  Télécharger PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
