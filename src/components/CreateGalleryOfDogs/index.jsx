import { useState, useEffect, Fragment } from "react";
import "./index.css";

const CreateGalleryOfDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState(3);

  const getRandomImages = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/${text}`
      );
      const data = await response.json();
      console.log(data);
      setDogs(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomImages();
  }, []);

  const updateState = (e) => {
    if (
      (e.target.value >= 1 && e.target.value <= 50) ||
      e.target.value === ""
    ) {
      setText(e.target.value);
    }
  };

  const countUpdate = () => {
    getRandomImages();
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <h1>Галерея собак:</h1>
      <p>Картинки обновлены {count} раз-а</p>

      <div className="update">
        <form action="">
          <label htmlFor="">Показать</label>
          <input value={text} onChange={updateState} />
        </form>
        <button onClick={countUpdate}>Обновить</button>
      </div>

      <div className="images">
        {dogs.length === 0
          ? "Загрузка"
          : dogs.map((item, index) => (
              <li key={index}>
                <img src={item} alt="" width="300px" /> <p>dog</p>
              </li>
            ))}
      </div>
    </>
  );
};

export default CreateGalleryOfDogs;
