/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import SingleComponent from "components/Single";
import Loader from "components/LoadingSpinner/Loader";

import {
  getSheets,
  reorderSheets,
  addSheet,
  deleteSheet,
  editSheet,
} from "store/actions/sheet.action";

import { descriptions, titles } from "data/static-data";
import "css/Singles/index.css";

const Sheets = () => {
  const sheets = useSelector((state) => state.sheets);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSheets()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${titles.sheets} - ${titles.main}`}
        image={sheets?.length > 0 && sheets[0]?.imageUrl}
        description={descriptions.sheets}
        quote={descriptions.sheets}
      />
      <main className="sheets-page">
        {isLoading ? (
          <Loader />
        ) : (
          <Container>
            <SingleComponent
              items={sheets}
              reorderItems={reorderSheets}
              addItem={addSheet}
              deleteItem={deleteSheet}
              editItem={editSheet}
              droppableId="sheet"
              text="sheet"
            />
          </Container>
        )}
      </main>
    </>
  );
};

export default Sheets;
