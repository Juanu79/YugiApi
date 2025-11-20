import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function Original() {

    const [cartas, setCartas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
                const json = await res.json();

                // Filtrar solo monstruos (tienen ATK) y evitar NaN
                const monstruos = json.data.filter(c =>
                    c.atk !== undefined && !isNaN(c.atk)
                );

                // Ordenar por ataque descendente
                monstruos.sort((a, b) => b.atk - a.atk);

                // Tomar los primeros 20
                setCartas(monstruos.slice(0, 20));

            } catch (error) {
                console.error("Error al cargar monstruos:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    if (cargando) {
        return (
            <View style={styles.cargando}>
                <ActivityIndicator size="large" />
                <Text>Cargando monstruos con mayor ATK...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text style={styles.titulo}>🔥 Monstruos con Mayor ATK 🔥</Text>

            {cartas.map((card) => (
                <View key={card.id} style={styles.item}>
                    <Image
                        source={{ uri: card.card_images[0].image_url }}
                        style={styles.img}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.nombre}>{card.name}</Text>
                        <Text style={styles.atk}>ATK: {card.atk}</Text>
                        <Text style={styles.tipo}>{card.type}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cargando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    img: {
        width: 90,
        height: 130,
        borderRadius: 8
    },
    nombre: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    atk: {
        fontSize: 14,
        marginTop: 5
    },
    tipo: {
        fontSize: 12,
        marginTop: 5,
        color: 'gray'
    }
});
