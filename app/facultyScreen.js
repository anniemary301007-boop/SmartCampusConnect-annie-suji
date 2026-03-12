import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FacultyScreen(){

const faculty = [
{ id:1, name:"Dr. Ravi Kumar", dept:"Computer Science" },
{ id:2, name:"Dr. Priya Sharma", dept:"Artificial Intelligence" },
{ id:3, name:"Dr. Arjun Singh", dept:"Information Technology" }
];

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>👩‍🏫 Faculty Management</Text>

{faculty.map((f)=>(
<View key={f.id} style={styles.card}>
<Text style={styles.name}>{f.name}</Text>
<Text style={styles.dept}>Department: {f.dept}</Text>
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

name:{
fontSize:16,
fontWeight:"bold"
},

dept:{
marginTop:5,
color:"#555"
}

});