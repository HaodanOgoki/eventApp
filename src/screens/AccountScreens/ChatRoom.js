import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { getDatabase, ref, onValue, push } from "@firebase/database";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { auth } from "../components/firebaseConfig";
import { FirebaseAuth } from "../../components/firebaseConfig";

const ChatRoomScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, "/messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let key in data) {
        loadedMessages.push({ id: key, ...data[key] });
      }
      setMessages(loadedMessages.reverse()); // Newest messages at the top
    });

    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    const db = getDatabase();
    const messagesRef = ref(db, "messages/");
    const user = FirebaseAuth.currentUser;
    const userName = user ? user.displayName || "Anonymous" : "Anonymous";

    // Push a new message to Firebase
    push(messagesRef, {
      text: message,
      timestamp: Date.now(),
      userId: FirebaseAuth.currentUser.uid,
      userName: userName,
      //   userName: "Anonymous"
    });
    setMessage("");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12; // 24h to 12h
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Adds leading zero if needed.
    const amPm = hours < 12 ? "AM" : "PM";
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            source={require("../../../assets/tabicon/back.png")}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.userId == FirebaseAuth.currentUser.uid
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text
                style={[
                  styles.userName,
                  item.userId === FirebaseAuth.currentUser.uid
                    ? styles.myName
                    : styles.userName,
                ]}
              >
                {item.userName}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  item.userId === FirebaseAuth.currentUser.uid
                    ? styles.myMsgText
                    : styles.messageText,
                ]}
              >
                {item.text}
              </Text>
              <Text style={styles.messageTime}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
          )}
          inverted
        />
        <View style={styles.messageBox}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Image
              style={styles.sendIcon}
              source={require("../../../assets/tabicon/send.png")}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  messageBox: {
    flexDirection: "row",
    width: "95%",
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 25,
    marginRight: 10,
  },
  sendBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginRight: -10,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
  },
  myMsgText: { textAlign: "right" },
  otherMessage: {
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 0,
    alignSelf: "flex-start",
  },
  userName: {
    fontWeight: "bold",
  },
  myName: { textAlign: "right" },
  messageText: {
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  backButton: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "30%",
  },
  backIcon: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ChatRoomScreen;
