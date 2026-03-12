import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function EventsScreen() {

const events = [
{ id:1, name:"Hackathon 2026", date:"March 25" },
{ id:2, name:"AI Workshop", date:"April 2" },
{ id:3, name:"Tech Seminar", date:"April 10" }
];

return (

<ScrollView style={styles.container}>

<Text style={styles.title}>📅 Manage Events</Text>

{events.map((event)=>(
<View key={event.id} style={styles.card}>
<Text style={styles.eventName}>{event.name}</Text>
<Text style={styles.date}>📍 {event.date}</Text>
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

eventName:{
fontSize:16,
fontWeight:"bold"
},

date:{
color:"#555",
marginTop:5
}

});