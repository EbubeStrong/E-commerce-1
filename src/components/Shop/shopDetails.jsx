import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight, FaEye, FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { fetchProducts } from "../../features/productsSlice";
import star from "../../assets/stars.svg";
import styles from "../../styles/carddisplay.module.css";
import LoadMoreButton from "../ui/button";

const BATCH_SIZE = 1; 

function Carddisplay() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleNextBatch = () => {
    setCurrentBatchIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex * BATCH_SIZE < products.length ? newIndex : prevIndex;
    });
  };

  const handlePrevBatch = () => {
    setCurrentBatchIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const applyThemeColor = () => {
    document.documentElement.style.setProperty('--theme-color', selectedColor);
  };

  const currentBatch = products.slice(
    currentBatchIndex * BATCH_SIZE,
    (currentBatchIndex + 1) * BATCH_SIZE
  );

  return (
    <div className={styles.card}>
      <div className={styles["hero-mainContainer"]}
       data-aos="fade-up"
       data-aos-offset="0"
       data-aos-duration="700"
       data-aos-delay="300"
      >
        <div className={styles["shop-links"]}>
          <nav>
            <a href="#" className={styles["home"]}>
              Home
            </a>
            <FaAngleRight />
            <a href="#" className={styles["shop"]}>
              Shop
            </a>
          </nav>
        </div>
        <div className={styles["hero-container"]}>
          {currentBatch.map((product) => (
            <div key={product.id} className={styles["hero-content"]}>
              <div className={styles["image-contents"]}>
                <div className={styles["image-content"]}>
                  <img
                  data-aos="zoom-in"
                  data-aos-once="true"
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                  />
                  <div
                    className={styles["left-icon"]}
                    onClick={handlePrevBatch}
                  >
                    <FaAngleLeft className="left-display"/>
                  </div>
                  <div
                    className={styles["right-icon"]}
                    onClick={handleNextBatch}
                  >
                    <FaAngleRight />
                  </div>
                </div>
                <div className={styles["image-1"]}>
                  {product.images.map((img, index) => (
                    <img key={index} src={img} alt={product.title} loading="lazy"
                    data-aos="slide-up"
                    />
                  ))}
                </div>
              </div>
              <div className={styles["hero-content-2"]}
              data-aos="fade"
              >
                <h4>{product.title}</h4>
                <div className={styles["icons"]}>
                  <img src={star} alt="Star rating" />
                  <span>{product.rating} Reviews</span>
                </div>
                <h3>${product.price}</h3>
                <h6>
                  Availability:{" "}
                  <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                </h6>
                <div className={styles["line"]}></div>
                <div className={styles["color-icons"]}>
                  {["#23a6f0", "#2dc071", "#e77c40", "#252b42"].map((color) => (
                    <span
                      key={color}
                      style={{
                        backgroundColor: color,
                        border:
                          selectedColor === color ? "2px solid white" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleColorClick(color)}
                    ></span>
                  ))}
                </div>
                <div className={styles["button-options"]}>
                  <LoadMoreButton
                    style={{
                      backgroundColor: selectedColor
                        ? selectedColor
                        : "#23a6f0",
                    }}
                    onClick={applyThemeColor}
                  >
                    Select Options
                  </LoadMoreButton>
                  <div className={styles["select-icons"]}>
                    <FaRegHeart />
                    <BsCart />
                    <FaEye />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carddisplay;
