import React, { useState } from 'react';

function adminTemplate() {

    const [formData, setFormData] = useState({
        name: '',
        rol: 'technician',
        ciudad: '', 
        celular: '' 
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Registering user:', formData);
    };

    return(
        <>
            <div className="admin-page-container">
                <h1>Registro de Personal</h1>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad de Trabajo:</label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad" // Change this to match the state key
                            value={formData.ciudad}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Número Celular:</label>
                        <input
                            type="text" 
                            id="celular"
                            name="celular" // Change this to match the state key
                            value={formData.celular}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rol">Rol:</label>
                        <select
                            id="rol"
                            name="rol" // Change this to match the state key
                            value={formData.rol}
                            onChange={handleInputChange}
                        >
                            <option value="technician">Técnico</option>
                            <option value="supervisor">Supervisor</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Registrar</button>
                </form>
            </div>
        </>
    ); 
}

export default adminTemplate;