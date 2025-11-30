import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { pagosService } from '../../services/pagosService';
import { Pago } from '../../types';
import { DataCard } from '../../ui/DataCard';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { colors } from '../../themes/colors';


export const PagosScreen= () =>{

    const [pagosRecientes, setPagosRecientes] = useState<Pago[]>([]);
    const [pagosTarjeta, setPagosTarjeta] = useState(0);
    const [cargando, setCargando] = useState(true);

    useEffect (()=>{

        cargarPagos();
    
    }, []);

    const cargarPagos = async () => {

        try{

            const fechaHaceUnMes = new Date();
            fechaHaceUnMes.setMonth(fechaHaceUnMes.getMonth() - 1);
            const fechaFormateada = fechaHaceUnMes.toISOString().split('T')[0];

            const [recientes, tarjeta] = await Promise.all([

                pagosService.findPagosByCliente(1),
                pagosService.countPagosByMetodo('TARJETA')
            ]);

            setPagosRecientes(recientes);
            setPagosTarjeta(tarjeta.total_pagos);

        }catch (error){

            console.error('Error alcargar pagos:', error);
        }finally {

            setCargando(false);

        };

    };

    if(cargando) {

        return <LoadingSpinner />;

    }

    return (

        <View style={styles.container}>
            <DataCard
            titulo="Pagos con Tarjeta"
            contenido={`Total: ${pagosTarjeta}`}
            />
            <FlatList
            data={pagosRecientes}
            keyExtractor={(item) => item.id_pago.toString()}
            renderItem={({ item }) => (
                <DataCard
                titulo={`Pago $${item.monto}`}
                contenido={`Método: ${item.metodo_pago}\nFecha: ${item.fecha}`}
                />
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: colors.gris_fondo,
        padding: 16

    }
});