import { useState } from "react";
import "./App.css";

function App() {
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState("");

  function handleFileChange(event) {
    if (event.target.files) {
      console.log(event.target.files);

      setImageFile(event.target.files[0]);
    }
  }

  async function handleUpload() {
    if (imageFile) {
      try {
        const imageData = new FormData();
        imageData.append("file", imageFile);

        const response = await fetch(
          "https://esmdxtfque.execute-api.eu-north-1.amazonaws.com/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const data = await response.json();
        console.log(data);
        setImageUrl(data.url);
      } catch (error) {}
    }
  }

  return (
    <main>
      <h2>Ladda upp en bild</h2>
      <section>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
        />
        <button onClick={handleUpload}>Ladda upp</button>
        <img src={imageUrl} />
      </section>
    </main>
  );
}

export default App;
