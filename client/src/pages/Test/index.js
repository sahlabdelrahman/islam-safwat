/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import SinglesComponentCopy from "components/SingleCopy";

import { getTest } from "store/actions/test.action";

import { descriptions, titles } from "data/static-data";
import "css/Singles/index.css";

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getTest()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${titles.singles} - ${titles.main}`}
        image={test?.length > 0 && test[0]?.imageUrl}
        description={descriptions.singles}
        quote={descriptions.singles}
      />
      <main className="singles-page">
        <Container>
          {isLoading ? (
            "loading..."
          ) : (
            <SinglesComponentCopy
              items={test}
              // reorderItems={reorderSingles}
              // addItem={addSingle}
              // deleteItem={deleteSingle}
              // editItem={editSingle}
              // droppableId="single"
              // text="single"
            />
          )}
        </Container>
      </main>
    </>
  );
};

export default Test;
