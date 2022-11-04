/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import ProjectComponent from "components/Project";
import Loader from "components/LoadingSpinner/Loader";

import {
  getProjects,
  reorderProjects,
  deleteProject,
  editProject,
  addProject,
} from "store/actions/project.action";

import { descriptions, titles } from "data/static-data";
import "css/Projects/index.css";

const Projects = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getProjects()).then(() => setIsLoading(false));
  }, [dispatch]);

  const projects = useSelector((state) => state.projects);

  return (
    <>
      <HelmetMetaData
        title={`${titles.projects} - ${titles.main}`}
        image={projects?.length > 0 && projects[0]?.cover?.imageUrl}
        description={descriptions.projects}
        quote={descriptions.projects}
      />
      <main className="projects-page">
        {isLoading ? (
          <Loader />
        ) : (
          <Container>
            <ProjectComponent
              items={projects}
              reorderItems={reorderProjects}
              droppableId="project"
              deleteItem={deleteProject}
              editItem={editProject}
              addItem={addProject}
              text="project"
            />
          </Container>
        )}
      </main>
    </>
  );
};

export default Projects;
