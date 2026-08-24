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

const API_KEY = "cv_lm57uHPiweJE86C2n-hopn4vVBPW09ZHrGykcNiZF_7OzoPgNRsKSl4IgjuP6PN2";

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
    const [paginas, setPaginas] = useState("");
    const [genero, setGenero] = useState("");
    const [autor, setAutor] = useState("");

    const [enviando, setEnviando] = useState(false);

    async function criarLivro() {
        if (!titulo) {
            Alert.alert("Preencha pelo menos o título.");
            return;
        }

        setEnviando(true);
        try {

            const páginasFormatadas = parseInt(paginas, 10);

            const resposta = await api.post("/api/livros", {
                title: titulo,
                description: descricao,
                status: "Publicado",
                imageUrl: imagemUrl,
                autor,
                paginas: isNaN(páginasFormatadas) ? 120 : páginasFormatadas,
                genero,
            });

            Alert.alert("Livro criado!", resposta.data.title);
            setTitulo("");
            setDescricao("");
            setImagemUrl("");
            setGenero("");
            setPaginas("");
            setAutor("");
        } catch (e) {
            console.log("Erro da API:", e.response?.data || e.message);

            const mensagemErro = e.response?.data?.message || e.response?.data?.error || "Verifique os dados enviados.";

            Alert.alert("Erro ao criar livro", mensagemErro);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar livro</Text>
                    <Text style={styles.subtitulo}>POST /api/livros</Text>
                </View>

                <Text style={styles.rotulo}>Título</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: Fantasma da Ópera"
                />

                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    style={styles.campo}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: Um romance sobre um fantasma que assombra uma ópera."
                />

                <Text style={styles.rotulo}>URL da imagem</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="Ex: https://exemplo.com/fantasma-da-opera.jpg"
                />

                <Text style={styles.secao}>Campos específicos do tema livros</Text>

                <Text style={styles.rotulo}>Gênero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Romance Gótico"
                />

                <Text style={styles.rotulo}>Número de páginas</Text>
                <TextInput
                    style={styles.campo}
                    value={paginas}
                    onChangeText={setPaginas}
                    placeholder="Ex: 320"
                />

                <Text style={styles.rotulo}>Autor(a)</Text>
                <TextInput
                    style={styles.campo}
                    value={autor}
                    onChangeText={setAutor}
                    placeholder="Ex: Gaston Leroux"
                />

                <Pressable style={styles.botao} onPress={criarLivro} disabled={enviando}>
                    <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar livro"}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f8fbff" },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#7c3ca1" },
    subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },
    secao: {
        fontSize: 14,
        fontWeight: "700",
        color: "#102542",
        marginTop: 8,
        marginBottom: 8,
    },

    rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
    campo: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: "white",
    },
    botao: {
        backgroundColor: "#85a0ad",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    botaoTexto: { color: "white", fontWeight: "700" },
});