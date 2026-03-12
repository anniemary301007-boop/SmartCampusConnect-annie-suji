import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Announcements() {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    fetchAnnouncements();

  }, []);

  const fetchAnnouncements = async () => {

    try {

      const response = await fetch("https://smart-campus-api-j6dd.onrender.com");
      const data = await response.json();

      setAnnouncements(data);

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <ScrollView style={styles.container}>

      {/* Gradient Header */}

      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <Text style={styles.headerSub}>Latest campus updates</Text>
      </LinearGradient>

      {/* Live Announcement Banner */}

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          🔔 Live Campus Announcements
        </Text>
      </View>

      {/* Search Bar */}

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search announcements..."
          style={styles.search}
        />
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>

        {announcements.map((item) => (

          <View style={styles.card} key={item.id}>

            <Text style={styles.tag}>Campus Notice</Text>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.text}>{item.message}</Text>

            <View style={styles.actions}>
              <Text>👍</Text>
              <Text>🔖 Save</Text>
              <Text>🔗 Share</Text>
            </View>

          </View>

        ))}

      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF5FB",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSub: {
    color: "#E3F2FD",
    marginTop: 5,
  },

  banner: {
    backgroundColor: "#007FAE",
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
  },

  bannerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  searchContainer: {
    padding: 20,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007FAE",

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  tag: {
    color: "#4B9CD3",
    fontWeight: "bold",
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13294B",
  },

  text: {
    marginTop: 4,
    color: "#555",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

});