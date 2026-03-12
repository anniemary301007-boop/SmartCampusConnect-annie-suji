import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function Register() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true
    }).start();
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const BASE_URL = "https://smart-campus-api-j6dd.onrender.com";

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        alert("Account Created Successfully 🎉");
        router.replace("/login");
      } else {
        alert("Registration failed: " + (data.message || ""));
      }

    } catch (error) {
      console.log(error);
      alert("Registration failed: Server error");
    }
  };

  return (
    <LinearGradient colors={["#2563EB","#1E3A8A"]} style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Animated.View style={{ opacity: fadeAnim }}>

            <View style={styles.header}>
              <Text style={styles.title}>Create an Account</Text>
              <Text style={styles.subtitle}>Sign up to access Smart Campus</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.inputBox}>
                <Ionicons name="person-outline" size={20} color="#555"/>
                <TextInput placeholder="Full Name" placeholderTextColor="#888" style={styles.input} value={name} onChangeText={setName}/>
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="mail-outline" size={20} color="#555"/>
                <TextInput placeholder="Email Address" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail}/>
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="card-outline" size={20} color="#555"/>
                <TextInput placeholder="Register Number" placeholderTextColor="#888" style={styles.input} value={regNo} onChangeText={setRegNo}/>
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="lock-closed-outline" size={20} color="#555"/>
                <TextInput placeholder="Create Password" placeholderTextColor="#888" secureTextEntry style={styles.input} value={password} onChangeText={setPassword}/>
              </View>

              <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
                <Text style={styles.signupText}>Sign Up 🚀</Text>
              </TouchableOpacity>

              <Text style={styles.loginLine}>
                Already have an account?{" "}
                <Text style={styles.loginLink} onPress={() => router.push("/login")}>Login</Text>
              </Text>
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  header:{alignItems:"center",marginBottom:30},
  title:{fontSize:32,fontWeight:"bold",color:"#fff"},
  subtitle:{color:"#E0E7FF",marginTop:6},
  card:{backgroundColor:"#fff",padding:25,borderRadius:20,elevation:8},
  inputBox:{flexDirection:"row",alignItems:"center",backgroundColor:"#F3F4F6",padding:12,borderRadius:10,marginBottom:15},
  input:{flex:1,marginLeft:10},
  signupBtn:{backgroundColor:"#2563EB",padding:14,borderRadius:10,alignItems:"center"},
  signupText:{color:"#fff",fontSize:16,fontWeight:"bold"},
  loginLine:{textAlign:"center",marginTop:15,color:"#555"},
  loginLink:{color:"#1E3A8A",fontWeight:"bold"}
});