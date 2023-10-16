import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";
import type { AuthResponseError } from "../types/types";
import PortalLayout from "../layout/PortalLayout";

export default function Parqueadero() {
  const [nombre, setNombre] = useState("");
  const [longitud, setLongitud] = useState("");
  const [altura, setAltura] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/parqueadero`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          longitud,
          altura,
        }),
      });

      if (response.ok) {
        console.log("El Parqueadero se creó correctamente");
        setErrorResponse("");
        goto("/parqueadero");
      } else {
        console.log("Algo malo ocurrió :o");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error || "An error occurred.");
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <PortalLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Parqueadero</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label>Longitud</label>
        <input type="text" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
        <label>Altura</label>
        <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} />
        <button>Create Parqueadero</button>
      </form>
    </PortalLayout>
  );
}
