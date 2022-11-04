/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import AddItem from "components/SinglePage/AddItem";
import AddText from "components/SinglePage/AddText";
import AddVideo from "components/Dashboard/AddVideo";
import Reorder from "components/Dashboard/Reorder";
import UploadImage from "components/Dashboard/UploadImage";
import HeadOfPage from "components/SinglePage/HeadOfPage";
import ContentOfPage from "components/SinglePage/ContentOfPage";

import {
  addImageToNew,
  addTextToNew,
  addVideoToNew,
  deleteImageFromNew,
  deleteTextFromNew,
  deleteVideoFromNew,
  editNewImageCaption,
  editNewText,
  getNew,
  reorderNewsImages,
  updateNewCover,
} from "store/actions/news.action";

import { titles } from "data/static-data";
import "css/Projects/Project/index.css";

const New = () => {
  const { newsId } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const newItem = useSelector((state) => state.new);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await dispatch(getNew(newsId)).then(() => setLoading(false));
      /* .catch((message) => dispatch(showErrorSnackbar(message))); */
    }
    fetchData();
  }, [newsId, dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${newItem.title} - ${titles.news}`}
        image={newItem && newItem?.cover?.imageUrl}
        description={newItem.description}
        quote={newItem.description}
      />
      <div className="single-page">
        <Container>
          {isLoggedIn && <AddItem addImage={addImageToNew} id={newsId} />}
          {isLoggedIn && <AddText addText={addTextToNew} id={newsId} />}

          {isLoggedIn && (
            <AddVideo addVideo={addVideoToNew} projectId={newsId} />
          )}
          {isLoggedIn && (
            <UploadImage
              text="Update cover"
              addImage={updateNewCover}
              id={newsId}
            />
          )}
          {isLoggedIn && (
            <Reorder
              reorderAction={reorderNewsImages}
              items={newItem?.items}
              droppableId="new-images"
              id={newsId}
            />
          )}
          <HeadOfPage
            title={newItem?.title}
            description={newItem?.description}
            loading={loading}
          />
          <ContentOfPage
            items={newItem?.items}
            video={newItem?.video}
            loading={loading}
            deleteImage={deleteImageFromNew}
            deleteText={deleteTextFromNew}
            deleteVideo={deleteVideoFromNew}
            editText={editNewText}
            editImage={editNewImageCaption}
            id={newsId}
          />
        </Container>
      </div>
    </>
  );
};

export default New;
