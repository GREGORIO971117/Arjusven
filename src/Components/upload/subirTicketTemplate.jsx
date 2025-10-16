import React, { useState } from "react";

export default function SubirTicketTemplate() {
    const [ticket, setTicket] = useState({
        servicio: {
            idServicios: "",
            fechaDeAsignacion: "",
            resolucion: "",
            situacionActual: "",
            nombreDeEss: "",
            incidencia: "",
            codigoDeAfiliado: "",
            supervidor: "",
            idMerchant: "",
            tipoDeServicio: "",
            motivoDeServicio: "",
            motivoReal: "",
            observaciones: "",
            guiaDeEncomienda: "",
            fechaDeEnvio: "",
            direccion: "",
            tecnico: "",
            sla: ""
        },
        adicionales: {
            idAdicionales: "",
            ciudad: "",
            cerroEnPuntoClave: "",
            tarjeta: "",
            marcaEntra: "",
            sim: "",
            modeloSale: "",
            serieFisicaSale: "",
            eliminadorSale: "",
            tipoDeComunicacion: "",
            ordenDeServicio: "",
            modeloDeStock: "",
            plaza: "",
            atencionEnPunto: "",
            cantidadTpv: "",
            serieLogicaEntra: "",
            ptidEntra: "",
            marcaSale: "",
            simSale: "",
            versionDeBrowser: "",
            tipoDeComunicacionSale: "",
            serieQueQuedaDeStock: "",
            tecnico: "",
            firmaEnEstacion: "",
            modeloEntra: "TPV Modelo A",
            serieFisicaEntra: "SF-A123456",
            eliminadorEntra: "",
            serieLogicaSale: "",
            ptidSale: "",
            estado: "Pendiente de Revisión",
            simQueQuedaDeStock: ""
        },
        attachments: []
    });

    const [ticketErrors, setTicketErrors] = useState({});
    const [artErrors, setArtErrors] = useState({});
    const [message, setMessage] = useState("");

    function handleServicioChange(e) {
        const { name, value } = e.target;
        setTicket((prev) => ({
            ...prev,
            servicio: { ...prev.servicio, [name]: value }
        }));
    }


    function handleTicketFiles(e) {
        const files = Array.from(e.target.files);
        setTicket((prev) => ({ ...prev, attachments: files }));
    }

    function validateTicket() {
        const errs = {};
        if (!ticket.servicio.nombreDeEss || ticket.servicio.nombreDeEss.trim() === "") {
            errs.nombreDeEss = "El campo nombreDeEss es requerido.";
        }
        // más validaciones opcionales se pueden agregar aquí
        setTicketErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function validateArticulo() {
        const errs = {};
        if (!articulo.titulo || articulo.titulo.trim() === "") {
            errs.titulo = "El título es requerido.";
        }
        if (!articulo.numeroDeSerie || articulo.numeroDeSerie.trim() === "") {
            errs.numeroDeSerie = "El número de serie es requerido.";
        }
        setArtErrors(errs);
        return Object.keys(errs).length === 0;
    }

    async function submitTicket(e) {
        e.preventDefault();
        setMessage("");
        if (!validateTicket()) return;
        // Construir FormData para incluir archivos si existen
        const fd = new FormData();
        fd.append("servicio", JSON.stringify(ticket.servicio));
        fd.append("adicionales", JSON.stringify(ticket.adicionales));
        ticket.attachments.forEach((f, i) => fd.append("attachments", f));
        try {
            // Reemplazar URL por la API real
            const res = await fetch("/api/tickets", { method: "POST", body: fd });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Error al crear ticket");
            }
            setMessage("Ticket creado correctamente.");
            // limpiar formulario si se desea:
            setTicket((prev) => ({
                ...prev,
                servicio: { ...prev.servicio, nombreDeEss: "" },
                attachments: []
            }));
            setTicketErrors({});
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    }

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