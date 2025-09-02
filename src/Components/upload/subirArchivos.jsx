import ServiceRequestForm from '../Service/ServiceRequestForm';

function subirArchivos({loadTickets}) {
    return(
        <>
            <h1>Gestión de Tickets de Servicio</h1>
            <p>Sube un archivo de Excel para ver los tickets generados.</p>

            <ServiceRequestForm onNewTicket={loadTickets} />
        </>
    )
}

export default subirArchivos;