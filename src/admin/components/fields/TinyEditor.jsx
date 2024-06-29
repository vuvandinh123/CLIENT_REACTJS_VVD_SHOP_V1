/* eslint-disable react/prop-types */
import { useField } from "formik";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TinyEditor = ({...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log(field.value, "ddd");
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    helpers.setValue(content);
  };

  return (
    <Editor
      apiKey="pkujmrtdapk72uundfzjrz4n8oyk7317vzss52lu4wpm94pj"
      onEditorChange={handleEditorChange}
      name={name ?? "details"}
      {...field}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount fullscreen preview",
        toolbar:
          "undo redo | blocks fontfamily fontsize | align lineheight | bold italic underline strikethrough | link image media table |  numlist bullist indent outdent | emoticons charmap | removeformat preview fullscreen",
        setup: (editor) => {
          editorRef.current = editor;
          editor.on("change", (e) =>
            handleEditorChange(editor.getContent(), editor)
          );
        },
      }}
    />
  );
};
export default TinyEditor;
