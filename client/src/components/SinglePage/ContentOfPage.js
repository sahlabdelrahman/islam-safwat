/** @format */

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Carousel from "components/Carousel";
import ImageOfPage from "./ImageOfPage";
import TextOfPage from "./TextOfPage";
import Video from "components/Video";

const ContentOfPage = ({
  items,
  video,
  loading,
  deleteImage,
  deleteText,
  deleteVideo,
  editText,
  editImage,
  id,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [currentSlide, setCurrentSlide] = useState(null);

  return (
    <div className="content-of-page">
      <Carousel
        currentSlide={currentSlide}
        items={items?.filter((item) => item.type === "image")}
        // items={items}
        open={open}
        handleClose={handleClose}
      />
      {loading ? (
        <div className="suspense-component">
          <CircularProgress />
        </div>
      ) : (
        <>
          {items?.length > 0 &&
            items?.map((item, index) => {
              if (item.type === "image") {
                return (
                  <ImageOfPage
                    key={item._id}
                    loading={loading}
                    item={item}
                    deleteImage={deleteImage}
                    editImage={editImage}
                    id={id}
                    index={index}
                    setCurrentSlide={setCurrentSlide}
                    handleClickOpen={handleClickOpen}
                  />
                );
              } else if (item.type === "text") {
                return (
                  <TextOfPage
                    key={item._id}
                    item={item}
                    deleteText={deleteText}
                    editText={editText}
                    id={id}
                  />
                );
              }
            })}
          {video && video.videoUrl.length > 0 && (
            <Video id={id} url={video.videoUrl} deleteVideo={deleteVideo} />
          )}
        </>
      )}
    </div>
  );
};
export default ContentOfPage;
