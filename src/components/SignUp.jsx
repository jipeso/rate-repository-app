import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import { object, string, ref } from "yup";

import Text from "./Text";
import theme from "../theme";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrastWhite,
    padding: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderStyle: "solid",
    borderRadius: 3,
    padding: 15,
    marginBottom: 10,
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
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username must be at most 30 characters long"),
  password: string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(30, "Password must be at most 30 characters long"),
  passwordConfirm: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const SignUpContainer = ({ onSubmit }) => {
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
        placeholderTextColor={theme.colors.textSecondary}
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
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />

      {formik.touched.password && formik.errors.password && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputField,
          hasError("passwordConfirm") && styles.inputFieldError,
        ]}
        secureTextEntry
        placeholder="Password confirmation"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
      />

      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.passwordConfirm}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="contrastWhite" fontWeight="bold">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({
        username,
        password,
      });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
