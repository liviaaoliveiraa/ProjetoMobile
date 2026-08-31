import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../../assets/snoopyaviao.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.decoration}>────୨ৎ────</Text>

          <Text style={styles.title}>Olá, Seja Bem-Vindo (a)!</Text>

          <Text style={styles.eyebrow}>A um site sobre mim!</Text>

          <Text style={styles.description}>
            Um site feito por mim e sobre mim, Lívia, para aprimorar meus
            conhecimentos em mobile e sobre mim mesma!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Do que gosto?</Text>
          <Text style={styles.cardItem}>• Do meu Cachorro (max)</Text>
          <Text style={styles.cardItem}>• Dormir</Text>
          <Text style={styles.cardItem}>• Snoopy's</Text>
          <Text style={styles.cardItem}>• E eu amo DS!</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Clique aqui para ver uma foto romântica...
            </Text>
          </Pressable>
        </Link>
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
    gap: 20,
    paddingBottom: 40,
  },

  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#90baf1",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: -5,
  },

  decoration: {
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#d0e2ff",
    textAlign: "center",
    marginTop: -5,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#d0e2ff",
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
    backgroundColor: "#90baf1",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },

  cardItem: {
    fontSize: 15,
    color: "#edf5ff",
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
    textAlign: "center",
  },
});