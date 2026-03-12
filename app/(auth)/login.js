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

export default function Login(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(()=>{
Animated.timing(fadeAnim,{
toValue:1,
duration:1200,
useNativeDriver:true
}).start();
},[]);

const handleLogin = async () => {

if(!email || !password){
alert("Enter email and password");
return;
}

try{

const BASE_URL = "https://smart-campus-api-j6dd.onrender.com";

const response = await fetch(`${BASE_URL}/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
body:JSON.stringify({
email:email,
password:password
})
});

const data = await response.json();

if(data.success){

if(data.user.role === "admin"){
router.replace("/adminDashboard");
}else{
router.replace("/home");
}

}else{
alert("Invalid email or password");
}

}catch(error){
console.log(error);
alert("Login failed");
}

};

return(

<LinearGradient
colors={["#2563EB","#1E3A8A"]}
style={styles.container}
>

<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS === "ios" ? "padding" : "height"}
>

<ScrollView
contentContainerStyle={{flexGrow:1, justifyContent:"center"}}
showsVerticalScrollIndicator={false}
keyboardShouldPersistTaps="handled"
>

<Animated.View style={{opacity:fadeAnim}}>

{/* App Title */}

<View style={styles.header}>
<Text style={styles.appTitle}>🏫 Smart Campus</Text>
<Text style={styles.appSubtitle}>Campus Management System</Text>
</View>

{/* Login Card */}

<View style={styles.card}>

<Text style={styles.loginTitle}>Login</Text>

{/* Email */}

<View style={styles.inputBox}>
<Ionicons name="mail-outline" size={20} color="#555"/>
<TextInput
placeholder="Enter Email"
placeholderTextColor="#888"
style={styles.input}
value={email}
onChangeText={setEmail}
/>
</View>

{/* Password */}

<View style={styles.inputBox}>
<Ionicons name="lock-closed-outline" size={20} color="#555"/>
<TextInput
placeholder="Enter Password"
placeholderTextColor="#888"
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>
</View>

{/* Login Button */}

<TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
<Text style={styles.loginText}>Login 🚀</Text>
</TouchableOpacity>

{/* Student Signup Line */}

<Text style={styles.signupLine}>
Students without an account can{" "}
<Text
style={styles.signupLink}
onPress={()=>router.push("/(auth)/register")}
>
Sign Up
</Text>{" "}
to access the Smart Campus portal.
</Text>

</View>

</Animated.View>

</ScrollView>

</KeyboardAvoidingView>

</LinearGradient>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

header:{
alignItems:"center",
marginBottom:40
},

appTitle:{
fontSize:36,
fontWeight:"bold",
color:"#fff"
},

appSubtitle:{
color:"#E0E7FF",
marginTop:6
},

card:{
backgroundColor:"#fff",
padding:25,
borderRadius:20,
elevation:8
},

loginTitle:{
fontSize:22,
fontWeight:"bold",
textAlign:"center",
marginBottom:20
},

inputBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#F3F4F6",
padding:12,
borderRadius:10,
marginBottom:15
},

input:{
flex:1,
marginLeft:10
},

loginBtn:{
backgroundColor:"#2563EB",
padding:14,
borderRadius:10,
alignItems:"center",
marginTop:10
},

loginText:{
color:"#fff",
fontSize:16,
fontWeight:"bold"
},

signupLine:{
textAlign:"center",
marginTop:15,
color:"#555",
fontSize:14
},

signupLink:{
color:"#1E3A8A",
fontWeight:"bold"
}

});