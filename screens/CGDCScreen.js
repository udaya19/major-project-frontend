import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import color from "../assets/colors/color";
import useCGDC from "../context/useCGDC";
import CGDCPostCard from "../components/CGDCPostCard";

const CGDCScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { posts, getPosts } = useCGDC();
  const fetchCGDCPosts = async () => {
    await getPosts();
  };
  useEffect(() => {
    fetchCGDCPosts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {user.role === "cgdc" && (
        <View style={styles.plusIconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("createCGDCPost")}
          >
            <View style={styles.plusIcon}>
              <MaterialCommunityIcons
                name="plus"
                size={25}
                color={color.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView>
        {posts?.map((post, index) => (
          <View key={post._id}>
            <CGDCPostCard
              postContent={post.content}
              postImgUri={post.image?.url}
              userImgUri={require("../assets/me.jpeg")}
              userName={post.user.name}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CGDCScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
  },
  plusIconContainer: {
    alignItems: "flex-end",
  },
  plusIcon: {
    marginRight: 30,
    backgroundColor: color.danger,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});