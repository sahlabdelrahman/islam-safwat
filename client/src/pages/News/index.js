/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import HelmetMetaData from "components/HelmetMetaData";
import ProjectComponent from "components/Project";
import Loader from "components/LoadingSpinner/Loader";

import {
  getNews,
  reorderNews,
  deleteNew,
  editNew,
  addNew,
} from "store/actions/news.action";

import { descriptions, titles } from "data/static-data";
import "css/Projects/index.css";

const News = () => {
  const news = useSelector((state) => state.news);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getNews()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${titles.news} - ${titles.main}`}
        image={news?.length > 0 && news[0]?.cover?.imageUrl}
        description={descriptions.news}
        quote={descriptions.news}
      />
      <main className="projects-page">
        {isLoading ? (
          <Loader />
        ) : (
          <Container>
            <ProjectComponent
              items={news}
              reorderItems={reorderNews}
              droppableId="new"
              deleteItem={deleteNew}
              editItem={editNew}
              addItem={addNew}
              text="news"
            />
          </Container>
        )}
      </main>
    </>
  );
};

export default News;
