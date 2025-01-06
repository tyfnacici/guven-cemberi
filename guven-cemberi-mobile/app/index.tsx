import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [showWebView, setShowWebView] = useState(false);

  const handleOpenWebView = () => {
    if (ipAddress) {
      setShowWebView(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showWebView ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter IP Address with Port (e.g., 192.168.1.1:8080)"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="url"
          />
          <Button title="Open in WebView" onPress={handleOpenWebView} />
        </View>
      ) : (
        <WebView
          source={{ uri: `http://${ipAddress}` }}
          style={styles.webview}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
  },
});
