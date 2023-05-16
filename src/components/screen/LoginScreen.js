import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { TextInput, SegmentedButtons, Button } from "react-native-paper";
import { useState } from "react";
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const screenWidth = Dimensions.get("window").width;

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [select, setSelect] = useState("login");
  const [confPassword, setConfPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState(false);

  const isEmailCorrect = (email) => {
    let exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (exp.test(email) === true) {
      return true;
    } else {
      return false;
    }
  };

  const registerNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(props.getUserStatus(true))
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //   })
      .catch((error) => {
        Alert.alert(JSON.stringify(error.message));
      });
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(props.getUserStatus(true))
      .catch((error) => {
        Alert.alert(JSON.stringify(error.message));
      });
  };

  const clearAll = () => {
    setEmail("");
    setPassword("");
    setConfPassword("");
  };

  const onSubmitHandler = () => {
    if (isEmailCorrect(email) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (select === "registation" && confPassword !== password) {
      setConfPasswordError(true);
    } else {
      setConfPasswordError(false);
    }

    if (
      !emailError &&
      !passwordError &&
      !confPasswordError &&
      select === "registation"
    ) {
      registerNewUser();
      clearAll();
    }

    if (!emailError && !passwordError && select === "login") {
      loginUser();
      clearAll();
    }
  };

  const onCancelHandler = () => {
    clearAll();
  };

  const image = require("../../../assets/images/money_plant2.jpg");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.loginContainer}>
          <View style={styles.select}>
            <SegmentedButtons
              value={select}
              onValueChange={setSelect}
              buttons={[
                {
                  value: "login",
                  label: "Login",
                  uncheckedColor: "white",
                  //onPress
                  style: {
                    borderColor: "white",
                  },
                },
                {
                  value: "registation",
                  label: "Registation",
                  uncheckedColor: "white",
                  style: {
                    borderColor: "white",
                  },
                },
              ]}
            />
          </View>
          <View style={styles.input}>
            {emailError && (
              <Text style={styles.errorText}>Email format is invalid</Text>
            )}
            <TextInput
              mode={"flat"}
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                width: screenWidth * 0.6,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
              theme={{ roundness: 20 }}
              error={emailError}
              dense={true}
            />
          </View>
          <View style={styles.input}>
            {passwordError && (
              <Text style={styles.errorText}>Password format is invalid</Text>
            )}
            <TextInput
              mode={"flat"}
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                width: screenWidth * 0.6,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
              theme={{ roundness: 20 }}
              error={passwordError}
              dense={true}
            />
          </View>
          {confPasswordError && select === "registation" && (
            <Text style={styles.errorText}>Password does not match</Text>
          )}
          {select === "registation" && (
            <View style={styles.input}>
              <TextInput
                mode={"flat"}
                label="Confirm Password"
                value={confPassword}
                secureTextEntry={true}
                onChangeText={(password) => setConfPassword(password)}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  width: screenWidth * 0.6,
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
                error={confPasswordError}
                theme={{ roundness: 20 }}
                dense={true}
              />
            </View>
          )}
          <View style={styles.button}>
            <Button
              mode="contained"
              buttonColor="rgba(0, 0, 0, 0.3)"
              onPress={() => onSubmitHandler()}
            >
              SUBMIT
            </Button>
            <Button
              mode="contained"
              buttonColor="rgba(0, 0, 0, 0.3)"
              onPress={() => onCancelHandler()}
            >
              CLEAR
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    //height: 400,
    width: screenWidth * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignSelf: "center",
    // justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 30,
  },
  select: {
    width: screenWidth * 0.8,
    marginBottom: 30,
    marginTop: 30,
  },
  button: {
    flexDirection: "row",
    width: "70%",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  errorText: {
    fontWeight: "600",
    color: "red",
    alignSelf: "center",
  },
});
