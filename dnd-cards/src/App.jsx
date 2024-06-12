import { useEffect, useState, useCallback } from "react";
import "./App.css";
import ActionAreaCard from "./Components/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCard from "./Components/DraggableCard";
import DropZone from "./Components/DropZone";
import Header from "./Components/Header";

function App() {
  const [data, setData] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loading) {
      fetchMoreData();
    }
  }, [loading]);

  const generateRandomHash = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let hash = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      hash += characters[randomIndex];
    }
    return hash;
  };

  const fetchMoreData = async () => {
    if (!hasMore) return;

    try {
      const iconFetchPromises = [];
      for (let i = 0; i < 6; i++) { // Fetch 6 items instead of 100
        const hash = generateRandomHash();
        iconFetchPromises.push(
          fetch(`https://dummyjson.com/icon/${hash}/300`).then(
            (response) => response
          )
        );
      }

      const newData = await Promise.all(iconFetchPromises);
      setData((prevData) => [...prevData, ...newData]);
      if (newData.length < 6) { // Adjust this to 6 to match the fetch size
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !loading
    ) {
      setLoading(true);
    }
  };

  const handleDrop = (item) => {
    // Remove the item from the data array
    setData((prevData) => prevData.filter((dataItem) => dataItem !== item));
    // Add the item to the droppedItems array
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="outerContainer">
          <div className="leftSide">
            {data.map((item, index) => (
              <div className="cardContainer" key={index}>
                <DraggableCard key={index} data={item} />
              </div>
            ))}
            {loading && <CircularProgress />}
            {!hasMore && <p>No more data to load</p>}
          </div>
          <div className="rightSide">
            <DropZone onDrop={handleDrop}>
              {[...droppedItems].reverse().map((item, index) => (
                <ActionAreaCard key={index} data={item} />
              ))}
            </DropZone>
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
