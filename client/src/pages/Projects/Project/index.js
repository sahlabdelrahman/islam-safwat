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
  addImage,
  addText,
  addVideo,
  getProject,
  reorderProjectImages,
  updateCover,
  deleteImageFromProject,
  deleteTextFromProject,
  deleteVideoFromProject,
  editImageCaption,
  editText,
} from "store/actions/project.action";

import { titles } from "data/static-data";
import "css/Projects/Project/index.css";

const Project = () => {
  const { projectId } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await dispatch(getProject(projectId)).then(() => setLoading(false));
    }
    fetchData();
  }, [projectId, dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${project.title} - ${titles.projects}`}
        image={project && project?.cover?.imageUrl}
        description={project.description}
        quote={project.description}
      />
      <div className="single-page">
        <Container>
          {isLoggedIn && <AddItem addImage={addImage} id={projectId} />}
          {isLoggedIn && <AddText addText={addText} id={projectId} />}
          {isLoggedIn && <AddVideo addVideo={addVideo} projectId={projectId} />}
          {isLoggedIn && (
            <UploadImage
              text="Update cover"
              addImage={updateCover}
              id={projectId}
            />
          )}
          {isLoggedIn && (
            <Reorder
              reorderAction={reorderProjectImages}
              items={project?.items}
              droppableId="project-images"
              id={projectId}
            />
          )}
          <HeadOfPage
            title={project?.title}
            description={project?.description}
            loading={loading}
          />
          <ContentOfPage
            items={project?.items}
            video={project?.video}
            loading={loading}
            deleteImage={deleteImageFromProject}
            deleteText={deleteTextFromProject}
            deleteVideo={deleteVideoFromProject}
            editText={editText}
            editImage={editImageCaption}
            id={projectId}
          />
        </Container>
      </div>
    </>
  );
};

export default Project;
