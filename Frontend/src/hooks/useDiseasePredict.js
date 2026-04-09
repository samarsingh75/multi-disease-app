import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

export function useDiseasePredict(diseaseId) {
  const [accuracy, setAccuracy] = useState(null);
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/model-info/${diseaseId}`)
      .then((r) => setAccuracy(Math.round(r.data.accuracy * 100)))
      .catch(() => setAccuracy(null))
      .finally(() => setLoadingAcc(false));
  }, [diseaseId]);

  const predict = async (payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const predRes = await axios.post(`${BASE_URL}/predict/${diseaseId}`, payload);
      setResult({
        riskLevel: predRes.data.risk_level,
        probability: predRes.data.probability,
        accuracy: (accuracy || 0) / 100,
      });
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to connect to prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return { accuracy, loadingAcc, result, loading, error, showModal, setShowModal, predict };
}
