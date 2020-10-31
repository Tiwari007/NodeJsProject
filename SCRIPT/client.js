const form = document.querySelector('form'); // grabbing an element on the page
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');

const ApiUrl = "http://localhost:5000/mews";

loadingElement.style.display = '';

listAllMews();





form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');


    const mew = {
      name,
      content
    };
    loadingElement.style.display = ''
    form.style.display = 'none';

  fetch(ApiUrl,{
      method:'POST',
      body:JSON.stringify(mew),
      headers:{
          'content-type':'application/json'
      }
  }).then(response => response.json())
    .then(createdMew => {
        form.reset();
        form.style.display = '';
        listAllMews();
        
    })
    
    
    
});


function listAllMews(){
  mewsElement.innerHTML = '';
  fetch(ApiUrl)
  .then(response => response.json())
  .then(mews => {
      mews.reverse();
      mews.forEach(mew => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = mew.name;

        const contents = document.createElement('p');
        contents.textContent = mew.content;

        const date = document.createElement('p');
        date.textContent = new Date(mew.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        mewsElement.appendChild(div);
      });
      loadingElement.style.display = 'none'
  });
}


// function listAllMews(){
//   fetch(ApiUrl)
//   .then(response => response.json())
//   .then(mews => {
//     console.log(mews);
//   });
// }