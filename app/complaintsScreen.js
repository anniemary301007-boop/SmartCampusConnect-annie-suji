import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ComplaintsScreen() {

  const complaints = [
    { id: 1, student: "Arun", issue: "WiFi not working in Block A" },
    { id: 2, student: "Meena", issue: "Projector not working in Lab 2" },
    { id: 3, student: "Rahul", issue: "Water problem in hostel" },
  ];

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>⚠ Student Complaints</Text>

      {complaints.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.student}>👨‍🎓 {item.student}</Text>
          <Text style={styles.issue}>{item.issue}</Text>
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

student:{
fontSize:16,
fontWeight:"bold"
},

issue:{
marginTop:5,
color:"#555"
}

});