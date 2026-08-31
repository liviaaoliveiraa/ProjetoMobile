import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const foto = require("../assets/mor.jpeg");

export default function Exemplo() {
  return (
    <ScrollView
      style={styles.safeArea}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>

        <Text style={styles.decoracao}>✦ ˚｡⋆♡⋆｡˚ ✦</Text>

        <Text style={styles.titulo}>Eu e meu mor 💙</Text>

        <Text style={styles.subtitulo}>
          te amo amor da minha vida!
        </Text>

        <View style={styles.decoracaoFoto}>
          <Text style={styles.coracao}>♡</Text>
          <View style={styles.linha} />
          <Text style={styles.coracao}>♡</Text>
        </View>

        <View style={styles.fotoContainer}>
          <Image
            source={foto}
            style={styles.foto}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textoContainer}>
          <Text style={styles.texto}>
            Lívia & Vitor Nunes
          </Text>

          <Text style={styles.descricao}>
            Uma das minhas partes favoritas da minha vida é poder
            compartilhar momentos com ele.
          </Text>
        </View>

        <Text style={styles.decoracaoFinal}>
          ˚₊‧꒰ა ♡ ໒꒱ ‧₊˚
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#576475",
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 50,
  },

  content: {
    alignItems: "center",
    padding: 24,
    borderRadius: 28,
    backgroundColor: "#90baf1",
  },

  decoracao: {
    fontSize: 22,
    color: "#ffffff",
    marginBottom: 10,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },

  subtitulo: {
    marginTop: 6,
    fontSize: 14,
    color: "#d0e2ff",
    textAlign: "center",
  },

  decoracaoFoto: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 10,
  },

  linha: {
    width: 45,
    height: 1,
    backgroundColor: "#d0e2ff",
  },

  coracao: {
    fontSize: 20,
    color: "#ffffff",
  },

  fotoContainer: {
    width: "100%",
    height: 380,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#ffffff",

    shadowColor: "#102542",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },

  foto: {
    width: "100%",
    height: "100%",
  },

  textoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  texto: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },

  descricao: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#edf5ff",
    textAlign: "center",
  },

  decoracaoFinal: {
    marginTop: 22,
    fontSize: 25,
    color: "#ffffff",
  },
});
