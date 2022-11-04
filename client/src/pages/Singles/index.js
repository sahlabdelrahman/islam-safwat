/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import SingleComponent from "components/Single";
import Loader from "components/LoadingSpinner/Loader";

import {
  getSingles,
  reorderSingles,
  addSingle,
  deleteSingle,
  editSingle,
} from "store/actions/single.action";

import { descriptions, titles } from "data/static-data";
import "css/Singles/index.css";

const Singles = () => {
  const dispatch = useDispatch();
  const singles = useSelector((state) => state.singles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSingles()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${titles.singles} - ${titles.main}`}
        image={singles?.length > 0 && singles[0]?.imageUrl}
        description={descriptions.singles}
        quote={descriptions.singles}
      />
      <main className="singles-page">
        {isLoading ? (
          <Loader />
        ) : (
          <Container>
            <SingleComponent
              items={singles}
              reorderItems={reorderSingles}
              addItem={addSingle}
              deleteItem={deleteSingle}
              editItem={editSingle}
              droppableId="single"
              text="single"
            />
          </Container>
        )}
      </main>
    </>
  );
};

export default Singles;
