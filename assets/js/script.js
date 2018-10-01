window.onload = () => {
  const getKeywordButton = document.querySelector('#submit-keyword');
  let isGenerated = false;
  getKeywordButton.addEventListener('click', () => {
    const host = 'http://localhost:3002/api';
    const http = new XMLHttpRequest();
    const getKeyword = document.querySelector('#keyword');
    console.log(getKeyword);

    http.open('GET', `${host}/giphy?keyword=${getKeyword['value']}`, true);

    http.onload = () => {
      if (http.status === 200) {
        const context = JSON.parse(http.response);
        console.log(getKeyword['value']);
        http.open('GET', `${context['url']}`, true);
        http.onload = () => {
          const readAPI = JSON.parse(http.response);
          if (isGenerated === false) {
            for (let index = 0; index < 16; index++) {
              const newElement = document.createElement('img');
              newElement.setAttribute('src', readAPI.data[index].images.downsized_still.url);
              newElement.classList.add(`image${index}`, 'rounded', 'float-left', 'img-thumbnail', 'mw-50', 'border-primary');
              newElement.style.height = '150px';
              newElement.style.margin = '5px';
              const getBody = document.querySelector('.img-container');
              getBody.appendChild(newElement);
              const moveIt = () => {
                document.images[index].setAttribute('src', readAPI.data[index].images.downsized.url);
              };
              const stillPic = () => {
                document.images[index].setAttribute('src', readAPI.data[index].images.downsized_still.url);
              }
              document.images[index].addEventListener('mouseover', moveIt, false);
              document.images[index].addEventListener('mouseleave', stillPic, false);
            }
            isGenerated = true;
          }
          if (isGenerated) {
            for (let index = 0; index < 16; index++) {
              const getImage = document.querySelector(`.image${index}`);
              getImage.setAttribute('src', readAPI.data[index].images.downsized_still.url);
              const moveIt = () => {
                document.images[index].setAttribute('src', readAPI.data[index].images.downsized.url);
              };
              const stillPic = () => {
                document.images[index].setAttribute('src', readAPI.data[index].images.downsized_still.url);
              }
              document.images[index].addEventListener('mouseover', moveIt, false);
              document.images[index].addEventListener('mouseleave', stillPic, false);
            }
          }
        }
      }
      http.send();
    };
    http.send();
  }, false);
}