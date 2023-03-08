import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import color from "../assets/colors/color";

import PlusButton from "../components/PlusButton";

import {
  getStudentGatePassRequestApi,
  getWardenGatePassRequestApi,
} from "../api/gatePass";
import GatePassCard from "../components/GatePassCard";

const GatePassScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [gatePass, setGatePass] = useState([]);
  const getStudentRequests = async () => {
    try {
      const response = await (await getStudentGatePassRequestApi()).data;
      if (response.success) {
        console.log(response.results);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getWardenGatePasses = async () => {
    try {
      const response = await (await getWardenGatePassRequestApi()).data;
      if (response.success) {
        console.log(response.results);
        setGatePass(response.results.requests);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    if (user.role === "user") {
      getStudentRequests();
    }
    if (user.role === "warden") {
      getWardenGatePasses();
    }
  }, []);
  return (
    <View style={styles.container}>
      {user.role === "user" && (
        <PlusButton
          screenName="raiseRequest"
          iconName="plus"
          onPress={() => navigation.navigate("gatePassRequest")}
        />
      )}
      <View style={styles.gatePass}>
        {gatePass.map(
          (pass) =>
            !pass.isAccepted && <GatePassCard key={pass._id} gatePass={pass} />
        )}
      </View>
    </View>
  );
};

export default GatePassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
  },
  gatePass: {},
});
