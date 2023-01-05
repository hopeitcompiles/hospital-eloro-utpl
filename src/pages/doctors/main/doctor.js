import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../../imports";
import { getDoctorById } from "../../../service/DoctorService";

export default function Doctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDoctor = async () => {
    setLoading(true);
    const response = await getDoctorById(id);
    if (response != null) {
      setDoctor(response);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDoctor();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!doctor) {
    return <h1>404 this doctor doesn't exist</h1>;
  }
  return <div>doctor {doctor?.name}</div>;
}
