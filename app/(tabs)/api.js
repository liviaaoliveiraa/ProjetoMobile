import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { SafeAreaView } from "react-native-safe-area-context"

const API_KEY = "cv_wgZBkYts23e3il7AgF2AZBVc59ESj2BoFkf55pfyU_IWwT2bDv7gpOn6tNXP4kb6"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY
    }
})

async function resolverImageUrl(url) {
    if (!url || typeof url !== "string") return null

    const urlNormalizada = url.includes("commons.wikimedia.org/wiki/Special:FilePath/")
        ? url.replace(/ /g, "_")
        : url

    try {
        const resposta = await fetch(urlNormalizada, { method: "HEAD" })
        return resposta?.url || urlNormalizada
    } catch (error) {
        console.log("Nao foi possivel resolver a URL da imagem:", urlNormalizada)
        return urlNormalizada
    }
}

export default function LivrosListarScreen() {
    const [livros, setLivros] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarLivros() {
        setCarregando(true)
        setErro(null)

        try {
            const resposta = await api.get("/api/livros", {
                params: { limit: 50 }
            })

            const livrosComImagemResolvida = await Promise.all(
                resposta.data.data.map(async (livro) => ({
                    ...livro,
                    imageUrl: await resolverImageUrl(livro.imageUrl)
                }))
            )

            setLivros(livrosComImagemResolvida)
        } catch (error) {
            setErro("Não foi possivel carregar livros")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarLivros()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar livros</Text>
                    <Text style={styles.subtitulo}>GET /api/livros</Text>
                </View>

                {carregando && (
                    <ActivityIndicator style={{ marginVertical: 16 }} />
                )}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    livros.map((livro) => (
                        <View key={livro.id} style={styles.card}>
                            {livro.imageUrl && (
                                <Image
                                    source={{ uri: livro.imageUrl }}
                                    height={64}
                                    width={64}
                                    style={styles.imagem}
                                />
                            )}

                            <View style={styles.info}>
                                <Text style={styles.titulo}>
                                    {livro.title}
                                </Text>

                                <Text style={styles.categoria}>
                                    {livro.autor} · {livro.genero}
                                </Text>

                                <Text style={styles.categoria}>
                                    {livro.ano_publicacao} · {livro.numero_paginas} páginas
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#cbdbe4"
    },

    conteudo: {
        padding: 24,
        paddingBottom: 48
    },

    header: {
        marginBottom: 16
    },

    tituloPagina: {
        fontSize: 24,
        fontWeight: "800",
        color: "#102542"
    },

    subtitulo: {
        fontSize: 14,
        color: "#5f6b7a",
        marginTop: 2
    },

    erro: {
        color: "#c62828",
        marginTop: 12
    },

    card: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        padding: 0
    },

    imagem: {
        width: 64,
        height: 90
    },

    info: {
        flex: 1,
        justifyContent: "center",
        paddingRight: 12,
        paddingVertical: 12
    },

    titulo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#102542"
    },

    categoria: {
        fontSize: 13,
        color: "#64748b",
        marginTop: 4
    }
})