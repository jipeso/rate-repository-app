import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import { number, object, string } from "yup";

import Text from "./Text";
import theme from "../theme";
import { useCreateReview } from "../hooks/useCreateReview";

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
  ownerName: string().required("Repository owner name is required"),
  repositoryName: string().required("Repository name is required"),
  rating: number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  text: string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewFormContainer = ({ onSubmit }) => {
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
          hasError("ownerName") && styles.inputFieldError,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputField,
          hasError("repositoryName") && styles.inputFieldError,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        style={[
          styles.inputField,
          hasError("rating") && styles.inputFieldError,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={[styles.inputField, hasError("text") && styles.inputFieldError]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
      {formik.touched.text && formik.errors.text && (
        <Text color="error" style={{ marginBottom: 15 }}>
          {formik.errors.text}
        </Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="contrastWhite" fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const result = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      navigate(`/${result.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
