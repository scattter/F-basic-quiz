import "./style/index.scss";

const index = window.location.href.split("/").pop();

fetch(`http://localhost:8080/users/${index}`)
  .then((response) => {
    return response.ok
      ? Promise.resolve(response.json())
      : Promise.reject(new Error("fail"));
  })
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data.avatar;

    const header = document.querySelector(".n-header");
    const nameAndAge = document.createElement("h2");
    nameAndAge.textContent = `MYNAME IS ${data.name} ${data.age} AND THIS IS MY RESUME/CV`;
    header.appendChild(nameAndAge);

    const description = document.querySelector(".description");
    const descriptionDetail = document.createElement("span");
    descriptionDetail.textContent = data.description;
    description.appendChild(descriptionDetail);
  })
  .catch((err) => {
    console.log(err);
  });

fetch(`http://localhost:8080/users/${index}/educations`)
  .then((response) => {
    return response.ok
      ? Promise.resolve(response.json())
      : Promise.reject(new Error("fail"));
  })
  .then((data) => {
    const education = document.querySelector(".education");
    data.forEach((element) => {
      const { title, year, description } = element;
      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
          <span>${year}</span>
          <div class="detail">
            <h4>${title}</h4>
            <span>${description}</span>
          </div>
        `;
      education.appendChild(info);
    });
  })
  .catch((err) => {
    console.log(err);
  });
