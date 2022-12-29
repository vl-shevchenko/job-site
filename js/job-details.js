const detailsWrapper = document.querySelector('.details-wrapper');
const detailsTitleJobName = document.querySelector('.details-title__job-name');
const detailsTitleData = document.querySelector('.details-title__data');
const detailsTitleSalary = document.querySelector('.details-title__salary');
const descriptionJob = document.querySelector('.description-job');
const additionalInfoEmploymentTypeContainer = document.querySelector(
  '.additional-info__employment-type-container'
);
const images = document.querySelector('.attached-images__container');
const locationD = document.querySelector('.location');
const nameHr = document.querySelector('.name');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');

// function parseINI(descriptionTwo) {
//   // Начнём с объекта, содержащего настройки верхнего уровня
//   var currentSection = { name: null, fields: [] };
//   var categories = [currentSection];

//   descriptionTwo.split(/\r?\n/).forEach(function (line) {
//     var match;
//     if (/^\s*(;.*)?$/.test(line)) {
//       return;
//     } else if ((match = line.match(/^\[(.*)\]$/))) {
//       currentSection = { name: match[1], fields: [] };
//       categories.push(currentSection);
//     } else if ((match = line.match(/^(\w+)=(.*)$/))) {
//       currentSection.fields.push({ name: match[1], value: match[2] });
//     } else {
//       throw new Error("Строчка '" + line + "' содержит неверные данные.");
//     }
//   });

//   return categories;
// }
// console.log(parseINI(descriptionTwo));

const params = new URLSearchParams(window.location.search);
console.log(params.get('id'));
const date = new Date(); //toISOString();

async function getResponse() {
  let response = await fetch(
    'https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'
  );
  let content = await response.json();
  let searchId = `${params.get('id')}`;
  let job = content.find((content) => content.id === searchId);
  console.log(job);
  const createdAt = new Date(job.createdAt);

  function changeContent() {
    detailsTitleJobName.innerHTML = `${job.title}`;
    detailsTitleData.innerHTML = `Posted ${Math.round(
      (date - createdAt) / 86400000
    )} days ago`;
    detailsTitleSalary.innerHTML = `€ ${job.salary
      .replaceAll('k', ' 000')
      .replace('-', ' - ')}`;

    const description = job.description.split(/\n/).filter(function (n) {
      return n.length > 2;
    });

    console.log(description);
    const descriptionJobInner = (description) => {
      description.map((val) => {
        descriptionJob.innerHTML += `<p>${val}</p>`;
      });
    };
    descriptionJobInner(description);

    locationD.innerHTML = `${job.address}`;
    nameHr.innerHTML = `${job.name}`;
    phone.innerHTML = `${job.phone}`;
    email.innerHTML = `${job.email}`;

    const pictures = job.pictures;
    const attachedImagesu = (pictures) => {
      pictures.map((val) => {
        images.innerHTML += `<img class="attached-images__img" src="${val}"/>`;
      });
    };
    attachedImagesu(pictures);

    const employment_type = job.employment_type;
    const employmentType = (employment_type) => {
      employment_type.map((val) => {
        additionalInfoEmploymentTypeContainer.innerHTML += `<div class="additional-info__employment-type">${val}</div>`;
      });
    };
    employmentType(employment_type);

    detailsWrapper.innerHTML += `<a class="btn-return" href="index.html#${job.id}">RETURN TO JOB BOARD</a>`;
  }
  changeContent();
}
getResponse();
