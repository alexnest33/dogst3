import { useState, useEffect } from "react";

const CreateGalleryOfDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("3");

  const getRandomImages = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/${text}`
      );
      const data = await response.json();
      setDogs(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomImages();
  }, [count]);

  const updateState = (e) => {
    const val = e.target.value;
    if (val === "" || (Number(val) >= 1 && Number(val) <= 50)) {
      setText(val);
    }
  };

  return (
    <div className="container">
      <h1>Галерея собак:</h1>
      <p>Картинки обновлены {count} раз-а</p>

      <label>
        Показать
        <input value={text} onChange={updateState} />
      </label>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Обновить
      </button>

      {dogs.length > 0
        ? dogs.map((item, index) => (
            <li key={index}>
              <img src={item} alt="" width="300px" /> <p>dog</p>
            </li>
          ))
        : "Загрузка..."}
    </div>
  );
};

export default CreateGalleryOfDogs;
