import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_wgZBkYts23e3il7AgF2AZBVc59ESj2BoFkf55pfyU_IWwT2bDv7gpOn6tNXP4kb6";

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY,
    },
});

export default function LivrosExcluirScreen() {
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [excluindoId, setExcluindoId] = useState(null);

    async function buscarLivros() {
        setCarregando(true);
        setErro(null);

        try {
            const resposta = await api.get("/api/livros", {
                params: { limit: 50 },
            });

            setLivros(resposta.data.data);
        } catch (e) {
            setErro("Não foi possível carregar os livros. Tenta de novo em instantes.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarLivros();
    }, []);

    async function excluirLivro(id) {
        setExcluindoId(id);

        try {
            await api.delete(`/api/livros/${id}`);

            setLivros((atual) =>
                atual.filter((item) => item.id !== id)
            );
        } catch (e) {
            Alert.alert(
                "Não deu pra excluir o livro",
                "A API respondeu com erro. Tenta de novo em instantes."
            );
        } finally {
            setExcluindoId(null);
        }
    }

    function confirmarExclusao(livro) {
        Alert.alert(
            "Excluir livro",
            `Tem certeza que quer excluir "${livro.title}"? Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => excluirLivro(livro.id),
                },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Excluir livro</Text>
                    <Text style={styles.subtitulo}>DELETE /api/livros/:id</Text>
                </View>

                {carregando && (
                    <ActivityIndicator style={{ marginVertical: 16 }} />
                )}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    livros.map((item) => (
                        <View key={item.id} style={styles.card}>
                            {item.imageUrl && (
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.imagem}
                                />
                            )}

                            <View style={styles.info}>
                                <Text style={styles.titulo}>
                                    {item.title}
                                </Text>

                                <Text style={styles.categoria}>
                                    {item.autor} · {item.genero}
                                </Text>

                                <Text style={styles.categoria}>
                                    {item.ano_publicacao} · {item.numero_paginas} páginas
                                </Text>
                            </View>

                            <Pressable
                                style={styles.botaoExcluir}
                                onPress={() => confirmarExclusao(item)}
                                disabled={excluindoId === item.id}
                            >
                                <Text style={styles.botaoExcluirTexto}>
                                    {excluindoId === item.id ? "..." : "Excluir"}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#cbdbe4",
    },

    conteudo: {
        padding: 24,
        paddingBottom: 48,
    },

    header: {
        marginBottom: 16,
    },

    tituloPagina: {
        fontSize: 24,
        fontWeight: "800",
        color: "#102542",
    },

    subtitulo: {
        fontSize: 14,
        color: "#5f6b7a",
        marginTop: 2,
    },

    erro: {
        color: "#c62828",
        marginTop: 12,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 12,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        paddingRight: 12,
    },

    imagem: {
        width: 64,
        height: 90,
    },

    info: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 10,
    },

    titulo: {
        fontSize: 16,
        fontWeight: "700",
    },

    categoria: {
        fontSize: 13,
        color: "#64748b",
        marginTop: 4,
    },

    botaoExcluir: {
        backgroundColor: "#102542",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },

    botaoExcluirTexto: {
        color: "white",
        fontWeight: "700",
        fontSize: 13,
    },
});