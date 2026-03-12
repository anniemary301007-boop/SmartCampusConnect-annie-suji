import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function AnnouncementScreen(){

const [title,setTitle] = useState("");
const [message,setMessage] = useState("");

const postAnnouncement = async () => {

if(title === "" || message === ""){
Alert.alert("Error","Please fill all fields");
return;
}

try{

const response = await fetch("http://192.168.43.189:5000/announcement",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:title,
message:message
})
});

const data = await response.json();

Alert.alert("Success","Announcement Posted Successfully");

setTitle("");
setMessage("");

}catch(error){

console.log(error);
Alert.alert("Error","Server not reachable");

}

};

return(

<View style={styles.container}>

<Text style={styles.title}>📢 Post Announcement</Text>

<TextInput
style={styles.input}
placeholder="Announcement Title"
value={title}
onChangeText={setTitle}
/>

<TextInput
style={styles.inputBox}
placeholder="Write announcement message..."
value={message}
onChangeText={setMessage}
multiline
/>

<TouchableOpacity style={styles.button} onPress={postAnnouncement}>
<Text style={styles.buttonText}>Post Announcement</Text>
</TouchableOpacity>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#F1F5F9"
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20,
color:"#1E3A8A"
},

input:{
backgroundColor:"#fff",
padding:15,
borderRadius:10,
marginBottom:15
},

inputBox:{
backgroundColor:"#fff",
padding:15,
borderRadius:10,
height:120,
marginBottom:20
},

button:{
backgroundColor:"#2563EB",
padding:15,
borderRadius:10,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"bold",
fontSize:16
}

});