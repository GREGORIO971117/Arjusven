import React, { useState } from "react";
import {apiRequest} from '../login/Api';

const API_BASE_URL = '/tickets';

export default function SubirTicketTemplate() {
    const [ticket, setTicket] = useState([]);
    const [ticketErrors, setTicketErrors] = useState({});
    const [message, setMessage] = useState("");


   
    return (
        <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 960, margin: "0 auto" }}>
            <h2>Crear ticket</h2>
            <form onSubmit={submitTicket} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 20 }}>
                <div>
                    <label>nombreDeEss</label>
                    <input
                        name="nombreDeEss"
                        value={ticket.servicio.nombreDeEss}
                        onChange={handleServicioChange}
                        placeholder="Nombre de estación"
                        style={{ width: "100%", padding: 6, marginTop: 4 }}
                    />
                    {ticketErrors.nombreDeEss && <div style={{ color: "red" }}>{ticketErrors.nombreDeEss}</div>}
                </div>

                <div style={{ marginTop: 8 }}>
                    <label>Incidencia</label>
                    <input name="incidencia" value={ticket.servicio.incidencia} onChange={handleServicioChange} style={{ width: "100%", padding: 6 }} />
                </div>


                <div style={{ marginTop: 8 }}>
                    <label>Adjuntar archivos</label>    <br></br>
                    <input type="file" multiple onChange={handleTicketFiles} />
                </div>

                <div style={{ marginTop: 12 }}>
                    <button type="submit">Crear ticket</button>
                </div>
            </form>


            {message && <div style={{ marginTop: 16, padding: 8, background: "#f3f3f3" }}>{message}</div>}
        </div>
    );
}