import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
// NOTA: Este componente se llama 'Home' para coincidir con tus imports en App.js

// Obtiene el ancho de la ventana para calcular el tamaño de los elementos
const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth / 2) - 15; // 2 items por fila - espacio

export default function Home() {
    const [cartas, setCartas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerCartas = async () => {
            try {
                // URL de la API de Yu-Gi-Oh!
                const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
                
                if (!res.ok) {
                    throw new Error(`Error en la petición: ${res.status}`);
                }
                
                const json = await res.json();
                
                // La API de Yu-Oh! devuelve un objeto con una propiedad 'data' que es un array.
                // Limitamos a las primeras 50 cartas para evitar sobrecargar la vista inicial.
                const listaCartas = json.data.slice(0, 50); 
                
                setCartas(listaCartas);
                setError(null);

            } catch (err) {
                console.error("Error al obtener datos de Yu-Gi-Oh!:", err);
                setError("No se pudieron cargar las cartas. Inténtalo de nuevo más tarde.");
            } finally {
                setCargando(false);
            }
        };
        
        obtenerCartas();
    }, []);

    if (cargando) {
        return (
            <View style={styles.contenedorCarga}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Cargando cartas de Yu-Gi-Oh!...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.contenedorCarga}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <Text style={styles.titulo}>Catálogo de Cartas Yu-Gi-Oh!</Text>
            <View style={styles.lista}>
                {cartas.map((card, index) => {
                    // La imagen principal de la carta se encuentra en card.card_images[0].image_url
                    const imageUrl = card.card_images?.[0]?.image_url;
                    
                    return (
                        <View key={card.id} style={[styles.item, { width: itemWidth }]}>
                            {imageUrl && (
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={styles.imagen}
                                />
                            )}
                            <Text style={styles.cardName}>{card.name}</Text>
                            <Text style={styles.cardType}>{card.type}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedorCarga: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },
    lista: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 8,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imagen: {
        width: '100%', // Usar el 100% del ancho del contenedor (itemWidth)
        height: 150, // Altura fija para la imagen de la carta
        resizeMode: 'contain',
        marginBottom: 5,
    },
    cardName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 5,
    },
    cardType: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    }
});

