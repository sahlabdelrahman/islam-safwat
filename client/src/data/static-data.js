/** @format */
// import Font from "@ckeditor/ckeditor5-font/src/font";

export const headerData = {
  logoText: "Islam Safwat",
  pages: ["singles", "projects", "news", "sheets", "bio"],
};

export const footerData = {
  text: "Islam Safwat",
  pages: ["singles", "projects", "news", "sheets", "bio"],
};

export const titles = {
  main: "Islam Safwat",
  singles: "Singles",
  projects: "Projects",
  news: "News",
  sheets: "Sheets",
  bio: "Bio",
};

export const descriptions = {
  main: "Islam Safwat, a photojournalist and documentary photographer born in Cairo March 1989. Graduated from the Faculty of Commerce Business Administration 2014. loves photography from childhood and use the old family cameras and smartphones when its arrived, then found the passion is on photojournalism so started works as a photojournalist at El Shorouk daily newspaper from 2016 till now, Islam based in Cairo, works as a Stringer with Associated Press Agency, and Bloomberg news, and Deutsche Press Agency, and contributor with GettyImages and NURPHOTO Agency, Work as a consultant with Goethe institute from March 2018, till now as a photographer",
  singles:
    "it’s a collection of pictures from different events and different photography categories you can find here, news, sports, street, travel, and more.",
  projects:
    "here’s the photo stories i have done or still working on it, and it’s in different types and topics.",
  news: "News stories, it’s some of my news coverage for the events I assigned to covering from local or international newspapers and agencies.",
  sheets:
    "it’s my pictures published on the different huge international media and newspapers.",
  bio: "Islam Safwat, a photojournalist and documentary photographer born in Cairo March 1989. Graduated from the Faculty of Commerce Business Administration 2014. loves photography from childhood and use the old family cameras and smartphones when its arrived, then found the passion is on photojournalism so started works as a photojournalist at El Shorouk daily newspaper from 2016 till now, Islam based in Cairo, works as a Stringer with Associated Press Agency, and Bloomberg news, and Deutsche Press Agency, and contributor with GettyImages and NURPHOTO Agency, Work as a consultant with Goethe institute from March 2018, till now as a photographer",
};

export const validationData = {
  sizeOfImage: 10000000,
  typesOfImage: ".jpg, .jpeg, .png, .gif",
};

export const animationData = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

export const ckEditorConfig = {
  // plugins: [Font],
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "blockquote",
      "insertTable",
      "undo",
      "redo",
    ],
  },

  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  language: "en",
};
