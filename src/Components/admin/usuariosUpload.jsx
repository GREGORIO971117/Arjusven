import { styles } from "./adminTemplate";

export default function UsuariosUpload({ addUser, form, isSubmitting, handleChange, error }) { 
    
    
   return (
        <div style={styles.card}>
            <form onSubmit={addUser} style={styles.form}>
                
                <div style={styles.row}>
                    <label style={styles.label}>Nombre
                        <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} required />
                    </label>
                    <label style={styles.label}>Correo
                        <input name="correo" type="email" value={form.correo} onChange={handleChange} style={styles.input} required />
                    </label>
                </div>
                <div style={styles.row}>
                    <label style={styles.label}>Estado de residencia
                        <input name="estadoDeResidencia" value={form.estadoDeResidencia} onChange={handleChange} style={styles.input} required />
                    </label>
                    <label style={styles.label}>Edad
                        <input name="edad" value={form.edad} onChange={handleChange} style={styles.input} inputMode="numeric" required />
                    </label>
                </div>
                <div style={styles.row}>
                    <label style={styles.label}>Rol
                        <select name="rol" value={form.rol} onChange={handleChange} style={styles.input} required>
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="TECNICO">TECNICO</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>
                            <option value="USUARIO">USUARIO</option>
                        </select>
                    </label>
                    <label style={styles.label}>Contraseña
                        <input name="contraseña" type="password" value={form["contraseña"]} onChange={handleChange} style={styles.input} required />
                    </label>
                </div> 
                
                {error && <div style={styles.error}>{error}</div>}

                <div style={{ marginTop: 16 }}>
                    <button type="submit" style={styles.buttonPrimary} disabled={isSubmitting}>
                        {isSubmitting ? "Agregando..." : "Agregar usuario"}
                    </button>
                </div>
            </form>
          </div>
            
        );
    }