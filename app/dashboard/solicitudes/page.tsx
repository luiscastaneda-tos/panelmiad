import { Suspense } from "react";
import DashboardModule from "./_components/_dashboard";
import { API_KEY } from "../../constants/constantes";

export default async function Dashboard() {
  try {
    const apiEndpoints = [
      "https://mianoktos.vercel.app/v1/mia/solicitud",
      "https://mianoktos.vercel.app/v1/mia/viajeros",
      "https://mianoktos.vercel.app/v1/mia/impuestos",
    ];
    const responses = await Promise.all(
      apiEndpoints.map((endpoint) =>
        fetch(endpoint, {
          headers: {
            "x-api-key": API_KEY || "",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          cache: "no-store",
        }).then((res) => res.json())
      )
    );
    if (responses[0].error || responses[1].error || responses[2].error) {
      throw new Error("Error al cargar los datos");
    }
    const [solicitudes, viajeros, impuestos] = responses;

    // return <h1>Estamos en mantenimiento...</h1>;

    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <DashboardModule
          data={solicitudes || []}
          viajeros={viajeros || []}
          impuestos={impuestos || []}
        ></DashboardModule>
      </Suspense>
    );
  } catch (error) {
    console.log("error en las solicitudes: ", error);
    return (
      <div>
        <h1>Ocurrió un error al obtener los registros.</h1>
      </div>
    );
  }
}
