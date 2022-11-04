/** @format */

import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import messageReducer from "./message.reducer";
import uiReducer from "./ui.reducer";
import featuredReducer from "./featured.reducer";
import singleReducer from "./single.reducer";
import sheetReducer from "./sheet.reducer";
import projectReducer from "./project.reducer";
import newsReducer from "./news.reducer";
import singleProjectReducer from "./singleProject.reducer";
import singleNewsReducer from "./singleNews.reducer";
import bioReducer from "./bio.reducer";
import contactReducer from "./contact.reducer";
import themeReducer from "./theme.reducer";
import testReducer from "./test.reducer";

const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  ui: uiReducer,
  featured: featuredReducer,
  singles: singleReducer,
  sheets: sheetReducer,
  projects: projectReducer,
  news: newsReducer,
  project: singleProjectReducer,
  new: singleNewsReducer,
  bio: bioReducer,
  contact: contactReducer,
  theme: themeReducer,
  test: testReducer,
});

export default reducers;
