import { ReservationsMain } from "./_components/reservations-main";
import { API_KEY } from "../../constants/constantes";

interface Booking {
  id_booking: string;
  id_servicio: string | null;
  check_in: string;
  check_out: string;
  total: number;
  subtotal: number;
  impuestos: number;
  estado: string;
  fecha_pago_proveedor: string | null;
  costo_total: number | null;
  costo_subtotal: number | null;
  costo_impuestos: number | null;
  fecha_limite_cancelacion: string;
  created_at: string;
  updated_at: string;
  nombre_hotel: string;
  cadena_hotel: string;
  tipo_cuarto: string;
  noches: string;
  is_rembolsable: string;
  monto_penalizacion: string;
  fecha_limite_pago: string;
}

export default async function ReservationsPage() {
  try {
    const response = await fetch("http://localhost:3001/v1/mia/reservas", {
      method: "GET",
      headers: {
        "x-api-key": API_KEY || "",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then((res) => res.json());
    console.log(response);

    return <ReservationsMain bookings={response.data} />;
  } catch (error) {
    console.error(error);
    return <h1>Ocurrio un error</h1>;
  }
}
