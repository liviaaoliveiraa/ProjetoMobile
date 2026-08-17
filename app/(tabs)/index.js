import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../../assets/logoooo.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>────୨ৎ────</Text>
          <Text style={styles.title}>Olá, Seja Bem-Vindo (a)!</Text>
          <Text style={styles.eyebrow}>A um site sobre mim!</Text>
          <Text style={styles.description}> Um site feito por mim e sobre mim, Lívia, para aprimorar meus conhecimentos em mobile e sobre mim mesma!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Do que gosto?</Text>
          <Text style={styles.cardItem}>• JavaScript habilitado</Text>
          <Text style={styles.cardItem}>• Rotas com expo-router</Text>
          <Text style={styles.cardItem}>• Abas e modal de exemplo</Text>
          <Text style={styles.cardItem}>• Scripts para Android, iOS e Web</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#576475",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#90baf1",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#d0e2ff",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#edf5ff",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#102542",
  },
  cardItem: {
    fontSize: 15,
    color: "#334e68",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#102542",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
