console.log("hi");

const form = document.querySelector("form");
const search = document.querySelector("input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        return;
      }
      console.log(data);
    });
  });
});
