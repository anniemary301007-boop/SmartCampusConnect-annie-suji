import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminDashboard() {

const router = useRouter();

const handleLogout = () => {
router.replace("/(auth)/login");
};

return (

<ScrollView style={styles.container}>

{/* LOGOUT BUTTON */}

<TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
<Ionicons name="log-out-outline" size={16} color="#fff" />
<Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

{/* HEADER */}

<View style={styles.header}>
<Text style={styles.headerTitle}>👨‍💼 Admin Dashboard</Text>
</View>

<Text style={styles.subtitle}>🏫 Smart Campus Management System</Text>

{/* DASHBOARD CARDS */}

<View style={styles.cardContainer}>

{/* ANNOUNCEMENT */}

<TouchableOpacity
style={styles.card}
onPress={() => router.push("/announcementScreen")}
>
<Ionicons name="megaphone" size={32} color="#2563EB" />
<Text style={styles.cardTitle}>📢 Manage Announcements</Text>
<Text style={styles.cardText}>Post or edit campus announcements</Text>
</TouchableOpacity>

{/* EVENTS */}

<TouchableOpacity
style={styles.card}
onPress={() => router.push("/eventsScreen")}
>
<Ionicons name="calendar" size={32} color="#10B981" />
<Text style={styles.cardTitle}>📅 Manage Events</Text>
<Text style={styles.cardText}>Create and manage campus events</Text>
</TouchableOpacity>

{/* FACILITY */}

<TouchableOpacity
style={styles.card}
onPress={() => router.push("/facilityScreen")}
>
<MaterialIcons name="meeting-room" size={32} color="#F59E0B" />
<Text style={styles.cardTitle}>🏢 Facility Requests</Text>
<Text style={styles.cardText}>Approve or reject facility bookings</Text>
</TouchableOpacity>

{/* FACULTY */}

<TouchableOpacity
style={styles.card}
onPress={() => router.push("/facultyScreen")}
>
<FontAwesome5 name="chalkboard-teacher" size={30} color="#8B5CF6" />
<Text style={styles.cardTitle}>👩‍🏫 Manage Faculty</Text>
<Text style={styles.cardText}>View and update faculty details</Text>
</TouchableOpacity>

{/* COMPLAINTS */}

<TouchableOpacity
style={styles.card}
onPress={() => router.push("/complaintsScreen")}
>
<Ionicons name="alert-circle" size={32} color="#EF4444" />
<Text style={styles.cardTitle}>⚠️ Complaints</Text>
<Text style={styles.cardText}>View and resolve student complaints</Text>
</TouchableOpacity>

</View>

{/* STATISTICS */}

<Text style={styles.sectionTitle}>📊 Campus Statistics</Text>

<View style={styles.statsContainer}>

<View style={styles.statBox}>
<Text style={styles.statNumber}>1280 👨‍🎓</Text>
<Text style={styles.statLabel}>Total Students</Text>
</View>

<View style={styles.statBox}>
<Text style={styles.statNumber}>18 ⚠️</Text>
<Text style={styles.statLabel}>Total Complaints</Text>
</View>

<View style={styles.statBox}>
<Text style={styles.statNumber}>5 🏢</Text>
<Text style={styles.statLabel}>Facility Requests</Text>
</View>

<View style={styles.statBox}>
<Text style={styles.statNumber}>2 📅</Text>
<Text style={styles.statLabel}>Upcoming Events</Text>
</View>

</View>

</ScrollView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F1F5F9",
padding:20
},

logoutBtn:{
alignSelf:"flex-end",
flexDirection:"row",
alignItems:"center",
backgroundColor:"#EF4444",
paddingVertical:4,
paddingHorizontal:10,
borderRadius:6,
marginBottom:10
},

logoutText:{
color:"#fff",
marginLeft:4,
fontWeight:"600",
fontSize:12
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:10
},

headerTitle:{
fontSize:26,
fontWeight:"bold",
color:"#1E3A8A"
},

subtitle:{
fontSize:16,
color:"#555",
marginBottom:20
},

cardContainer:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

card:{
width:"48%",
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginBottom:15,
elevation:4
},

cardTitle:{
fontSize:15,
fontWeight:"bold",
marginTop:8
},

cardText:{
fontSize:12,
color:"#666",
marginTop:4
},

sectionTitle:{
fontSize:18,
fontWeight:"bold",
marginTop:10,
marginBottom:10
},

statsContainer:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

statBox:{
width:"48%",
backgroundColor:"#fff",
padding:18,
borderRadius:12,
alignItems:"center",
marginBottom:15,
elevation:3
},

statNumber:{
fontSize:22,
fontWeight:"bold",
color:"#2563EB"
},

statLabel:{
fontSize:13,
marginTop:4,
color:"#555"
}

});