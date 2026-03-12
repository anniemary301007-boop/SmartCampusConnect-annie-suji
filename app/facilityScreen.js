import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FacilityScreen(){

const requests = [
{ id:1, facility:"Auditorium", status:"Pending" },
{ id:2, facility:"Seminar Hall", status:"Approved" },
{ id:3, facility:"Computer Lab", status:"Pending" }
];

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>🏢 Facility Requests</Text>

{requests.map((req)=>(
<View key={req.id} style={styles.card}>
<Text style={styles.facility}>{req.facility}</Text>
<Text style={styles.status}>Status: {req.status}</Text>
</View>
))}

</ScrollView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F1F5F9",
padding:20
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20,
color:"#1E3A8A"
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:10,
marginBottom:15,
elevation:3
},

facility:{
fontSize:16,
fontWeight:"bold"
},

status:{
marginTop:5,
color:"#555"
}

});