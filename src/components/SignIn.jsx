import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import { object, string } from "yup";

import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderStyle: "solid",
    borderRadius: 3,
    padding: 15,
    marginBottom: 15,
  },
  inputFieldError: {
    borderColor: theme.colors.error,
  },
  button: {
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
});

const validationSchema = object({
  username: string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  password: string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const hasError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputField,
          hasError("username") && styles.inputFieldError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.inputField,
          hasError("password") && styles.inputFieldError,
        ]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="contrastWhite" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
