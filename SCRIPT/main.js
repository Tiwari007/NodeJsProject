// const hero = document.querySelector('.hero');
//         const text = document.querySelector('.hero>h1');
//         const walk = 400;  //100px


//         function shadow(e)
//         {
//             // console.log(e);

//             const width = hero.offsetWidth;
//             const height = hero.offsetHeight;
//             // const { offsetWidth : width , offsetHeight : height} = hero; //We write in this shortcut also

//             let { offsetX : x , offsetY : y} = e;
//             // console.log(x,y);

//             if(this !== e.target)
//             {
//                 x = x+e.target.offsetLeft;
//                 y = y+e.target.offsetTop;
//             }

//             const xWalk = Math.round((x / width * walk) - (walk/2));
//             const yWalk = Math.round((y / width * walk) - (walk/2));

//             text.style.textShadow = `
//             ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
//             ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
//             ${yWalk}px ${xWalk * -1}px 0 rgba(0,0,255,0.7),
//             ${yWalk * -1}px ${xWalk}px 0 rgba(0,255,0,0.7)
//             `;
            
//             // console.log(x,y);

//         }

//         hero.addEventListener("mousemove",shadow);





const mewsElement = document.querySelector('.mews');
const ApiUrl = "http://localhost:5000/mews";
listAllMews();


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
  });
}


// function listAllMews(){
//   fetch(ApiUrl)
//   .then(response => response.json())
//   .then(mews => {
//     console.log(mews);
//   });
// }





