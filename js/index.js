const main = document.querySelector('.main');
const jobCard = document.querySelector('.job-card');
const jobCardLog = document.querySelector('.job-card__log');
const jobCardContentWrapper = document.querySelector(
  '.job-card__content-wrapper'
);
const jobCardTitle = document.querySelector('.job-card__title');
const jobCardSuptitle = document.querySelector('.job-card__suptitle');
const jobCardLocation = document.querySelector('.job-card__location');
const jobCardRatingWrapper = document.querySelector(
  '.job-card__rating-wrapper'
);
const jobCardDateWrapper = document.querySelector('.job-card__date-wrapper');
const jobCardBookmark = document.querySelector('.job-card__bookmark');
const jobCardDate = document.querySelector('.job-card__date');
const date = new Date(); //toISOString();

async function getResponse() {
  let response = await fetch(
    'https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'
  );
  let content = await response.json();

  let key;
  for (key in content) {
    const createdAt = new Date(content[key].createdAt);
    //<a name="${content[key].id}"></a>
    main.innerHTML += `
    <a name="${content[key].id}"></a>
            <div class="job-card" ">
              <img class="job-card__log" src="images/hospital-logo.png" />
              <div class="job-card__content-wrapper">
                <a class="job-card__title" href="job-details.html?id=${
                  content[key].id
                }">
                ${content[key].title}
                </a>
                <p class="job-card__suptitle">
                ${content[key].address}
                </p>
                <p class="job-card__location">${content[key].address}</p>
              </div>
              <div class="job-card__rating-wrapper">
                <img class="job-card__rating-star" src="images/star.svg" />
                <img class="job-card__rating-star" src="images/star.svg" />
                <img class="job-card__rating-star" src="images/star.svg" />
                <img class="job-card__rating-star" src="images/star.svg" />
                <img class="job-card__rating-star" src="images/star.svg" />
              </div>
              <div class="job-card__date-wrapper">
                <img src="images/bookmark.svg" alt="" class="job-card__bookmark" />
                <p class="job-card__date">Posted ${Math.round(
                  (date - createdAt) / 86400000
                )} days ago</p>
              </div>
            </div>
    `;
  }
  console.log(content);
}
getResponse();
