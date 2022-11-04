/** @format */

export const getMessageFromError = (error) => {
  console.log(error);
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  return message;
};
