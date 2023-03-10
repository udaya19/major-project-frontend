import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import TextInputComp from "../components/TextInput";

import color from "../assets/colors/color";
import LinearGradientButton from "../components/LinearGradientButton";
import { updatePasswordApi } from "../api/user";

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        return alert("New password and confirm new password must be same");
      }
      const { success, error, message } = await (
        await updatePasswordApi(
          currentPassword,
          newPassword,
          confirmNewPassword
        )
      ).data;
      if (success) {
        alert(message);
        navigation.navigate("profile");
      } else {
        alert(error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputComp
          value={currentPassword}
          placeholder="Enter your current password"
          placeholderTextColor={color.white}
          boxWidth={400}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <TextInputComp
          value={newPassword}
          placeholder="Enter your new password"
          placeholderTextColor={color.white}
          boxWidth={400}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInputComp
          value={confirmNewPassword}
          placeholder="Confirm your new password"
          placeholderTextColor={color.white}
          boxWidth={400}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmNewPassword(text)}
        />
        <LinearGradientButton title="Change Password" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.black,
  },
});
