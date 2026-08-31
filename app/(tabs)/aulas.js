import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const curiosidades = [
  {
    emoji: "🎲",
    titulo: "Ordem Paranormal",
    texto: "Eu amo Ordem Paranormal e amo o cellbit, eba.",
  },
  {
    emoji: "🍦",
    titulo: "Baunilha",
    texto: "Eu amo baunilha, é um dos meus sabores e cheiros favoritos.",
  },
  {
    emoji: "💙",
    titulo: "Minha cor favorita",
    texto: "Eu amo azul. É simplesmente a melhor cor do mundo.",
  },
  {
    emoji: "🇺🇸",
    titulo: "Professora de inglês",
    texto: "Eu dou aulas de inglês para crianças, matriculem seus filhos na Fisk.",
  },
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Curiosidades sobre mim</Text>

          <Text style={styles.description}>
            Eba!
          </Text>
        </View>

        <View style={styles.list}>
          {curiosidades.map((curiosidade) => (
            <View key={curiosidade.titulo} style={styles.listItem}>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{curiosidade.emoji}</Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.listTitle}>
                  {curiosidade.titulo}
                </Text>

                <Text style={styles.listText}>
                  {curiosidade.texto}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.decoracao}>✦ ˚｡⋆♡⋆｡˚ ✦</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#cbdbe4",
  },

  container: {
    padding: 24,
    paddingBottom: 48,
    gap: 20,
  },

  header: {
    paddingVertical: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102542",
    textAlign: "center",
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#102542",
    marginTop: 6,
    textAlign: "center",
  },

  list: {
    gap: 12,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },

  emojiContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#90baf1",
  },

  emoji: {
    fontSize: 23,
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  listTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#102542",
  },

  listText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#102542",
  },

  decoracao: {
    fontSize: 22,
    color: "#edf3fc",
    textAlign: "center",
    marginTop: 4,
  },
});
