import MySwal from "sweetalert2";

const handleErrors = (err) => {
  console.log(err.response.data.error);
  console.log(err.response.data.message);
  let error =
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.data?.error ||
    err?.data?.message ||
    err?.error ||
    err?.message;
  if (typeof error === "string") {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  } else if (typeof error === "object") {
    let errorArray = Object.keys(error).map(
      (value, key) =>
        `<li class="list-group-item">${value} => ${error[value]}</li>`
    );
    console.log(errorArray);
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      html: `<ul class="list-group">${errorArray.join("")}</ul>`,
    });
  } else {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

export default handleErrors;
