import React from 'react';
import styles from './RenderDataServicios.module.css';

const RenderDatosAdicionales = ({ editableData }) => (
    <>
        <div className={styles.infoSection}>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <strong>Ciudad</strong>: 
                    <span>{editableData.additionalData?.ciudad}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Cantidad TPV en Base</strong>: 
                    <span>{editableData.additionalData?.cantidadTPV}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Modelo entra</strong>: 
                    <span>{editableData.additionalData?.modeloEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Marca Entra</strong>: 
                    <span>{editableData.additionalData?.marcaEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Serie Lógica entra</strong>: 
                    <span>{editableData.additionalData?.serieLogicaEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Serie Física entra</strong>: 
                    <span>{editableData.additionalData?.serieFisicaEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Versión Browser</strong>: 
                    <span>{editableData.additionalData?.versionBrowser}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Tipo de Comunicación</strong>: 
                    <span>{editableData.additionalData?.tipoComunicacion}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>SIM entra</strong>: 
                    <span>{editableData.additionalData?.simEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>PTID entra</strong>: 
                    <span>{editableData.additionalData?.ptidEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Eliminador Entra</strong>: 
                    <span>{editableData.additionalData?.eliminadorEntra}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Eliminador Sale</strong>: 
                    <span>{editableData.additionalData?.eliminadorSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Estado</strong>: 
                    <span>{editableData.additionalData?.estado}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Orden de Servicio</strong>: 
                    <span>{editableData.additionalData?.ordenDeServicio}</span>
                </div>
            </div>
            <div className={styles.infoColumn}>
                <div className={styles.infoItem}>
                    <strong>Modelo Sale</strong>: 
                    <span>{editableData.additionalData?.modeloSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Marca Sale</strong>: 
                    <span>{editableData.additionalData?.marcaSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Serie Lógica sale</strong>: 
                    <span>{editableData.additionalData?.serieLogicaSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Serie Física sale</strong>: 
                    <span>{editableData.additionalData?.serieFisicaSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Versión Browser</strong>: 
                    <span>{editableData.additionalData?.versionBrowserSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Tipo de Comunicación</strong>: 
                    <span>{editableData.additionalData?.tipoComunicacionSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>SIM Sale</strong>: 
                    <span>{editableData.additionalData?.simSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>PTID Sale</strong>: 
                    <span>{editableData.additionalData?.ptidSale}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Plaza</strong>: 
                    <span>{editableData.additionalData?.plaza}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Técnico</strong>: 
                    <span>{editableData.additionalData?.tecnico}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Cerro en Punto Clave</strong>: 
                    <span>{editableData.additionalData?.cerroPuntoClave}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Atención en Punto</strong>: 
                    <span>{editableData.additionalData?.atencionEnPunto}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>Firma en Estación</strong>: 
                    <span>{editableData.additionalData?.firmaEnEstacion}</span>
                </div>
                <div className={styles.infoItem}>
                    <strong>#Tarjeta / TAG</strong>: 
                    <span>{editableData.additionalData?.tarjetaTag}</span>
                </div>
            </div>
        </div>
        <div className={styles.fullWidthSection}>
            <div className={styles.infoItem}>
                <strong>INVENTARIO</strong>
            </div>
            <div className={styles.infoItem}>
                <strong>Serie que queda de stock</strong>: 
                <span>{editableData.additionalData?.serieStock}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>SIM que queda de stock</strong>: 
                <span>{editableData.additionalData?.simStock}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Modelo de Stock</strong>: 
                <span>{editableData.additionalData?.modeloStock}</span>
            </div>
        </div>
    </>
);

export default RenderDatosAdicionales;