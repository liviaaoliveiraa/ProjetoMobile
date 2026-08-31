import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
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

export default function LivrosCriarScreen() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [numeroPaginas, setNumeroPaginas] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [genero, setGenero] = useState("");
    const [autor, setAutor] = useState("");

    const [enviando, setEnviando] = useState(false);

    async function criarLivro() {
        if (
            !titulo ||
            !descricao ||
            !imagemUrl ||
            !numeroPaginas ||
            !anoPublicacao ||
            !genero ||
            !autor
        ) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }

        const paginasFormatadas = parseInt(numeroPaginas, 10);
        const anoFormatado = parseInt(anoPublicacao, 10);

        if (isNaN(paginasFormatadas)) {
            Alert.alert("Erro", "Número de páginas inválido.");
            return;
        }

        if (isNaN(anoFormatado)) {
            Alert.alert("Erro", "Ano de publicação inválido.");
            return;
        }

        setEnviando(true);

        try {
            const dadosLivro = {
                title: titulo,
                description: descricao,
                status: "Publicado",
                imageUrl: imagemUrl,
                autor: autor,
                numero_paginas: paginasFormatadas,
                ano_publicacao: anoFormatado,
                genero: genero,
            };

            console.log("Enviando para API:", dadosLivro);

            const resposta = await api.post("/api/livros", dadosLivro);

            console.log("Resposta da API:", resposta.data);

            Alert.alert(
                "Livro criado!",
                resposta.data?.title || "Livro criado com sucesso."
            );

            setTitulo("");
            setDescricao("");
            setImagemUrl("");
            setNumeroPaginas("");
            setAnoPublicacao("");
            setGenero("");
            setAutor("");
        } catch (e) {
            console.log(
                "Erro da API:",
                e.response?.data || e.message
            );

            const mensagemErro =
                e.response?.data?.message ||
                e.response?.data?.error ||
                "Verifique os dados enviados.";

            Alert.alert("Erro ao criar livro", mensagemErro);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>

                <Text style={styles.tituloPagina}>Criar livro</Text>
                <Text style={styles.subtitulo}>
                    Cadastre um novo livro
                </Text>

                <Text style={styles.rotulo}>Título</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: O Fantasma da Ópera"
                    placeholderTextColor="#829ab1"
                />

                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    style={[styles.campo, styles.campoDescricao]}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: Um romance sobre um fantasma que assombra uma ópera."
                    placeholderTextColor="#829ab1"
                    multiline
                />

                <Text style={styles.rotulo}>URL da imagem</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="https://exemplo.com/imagem.jpg"
                    placeholderTextColor="#829ab1"
                    autoCapitalize="none"
                    keyboardType="url"
                />

                <Text style={styles.secao}>
                    Campos específicos do livro
                </Text>

                <Text style={styles.rotulo}>Gênero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: Romance Gótico"
                    placeholderTextColor="#829ab1"
                />

                <Text style={styles.rotulo}>Número de páginas</Text>
                <TextInput
                    style={styles.campo}
                    value={numeroPaginas}
                    onChangeText={setNumeroPaginas}
                    placeholder="Ex: 320"
                    placeholderTextColor="#829ab1"
                    keyboardType="numeric"
                />

                <Text style={styles.rotulo}>Ano de publicação</Text>
                <TextInput
                    style={styles.campo}
                    value={anoPublicacao}
                    onChangeText={setAnoPublicacao}
                    placeholder="Ex: 1844"
                    placeholderTextColor="#829ab1"
                    keyboardType="numeric"
                />

                <Text style={styles.rotulo}>Autor(a)</Text>
                <TextInput
                    style={styles.campo}
                    value={autor}
                    onChangeText={setAutor}
                    placeholder="Ex: Joaquim Manuel de Macedo"
                    placeholderTextColor="#829ab1"
                />

                <Pressable
                    style={[
                        styles.botao,
                        enviando && styles.botaoDesativado,
                    ]}
                    onPress={criarLivro}
                    disabled={enviando}
                >
                    <Text style={styles.botaoTexto}>
                        {enviando ? "Enviando..." : "Criar livro"}
                    </Text>
                </Pressable>

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

    tituloPagina: {
        fontSize: 28,
        fontWeight: "800",
        color: "#102542",
        marginBottom: 4,
    },

    subtitulo: {
        fontSize: 14,
        color: "#102542",
        marginBottom: 20,
    },

    secao: {
        fontSize: 18,
        fontWeight: "700",
        color: "#102542",
        marginTop: 8,
        marginBottom: 10,
    },

    rotulo: {
        fontSize: 13,
        fontWeight: "700",
        color: "#102542",
        marginBottom: 5,
    },

    campo: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        backgroundColor: "#ffffff",
        fontSize: 15,
        color: "#334e68",
    },

    campoDescricao: {
        minHeight: 100,
        textAlignVertical: "top",
    },

    botao: {
        backgroundColor: "#102542",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 8,
    },

    botaoDesativado: {
        opacity: 0.6,
    },

    botaoTexto: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "700",
    },
});

