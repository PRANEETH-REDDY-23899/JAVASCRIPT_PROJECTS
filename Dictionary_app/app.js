let input =document.querySelector('#input');
let searchBtn= document.querySelector('#search');
let notFound= document.querySelector('.default');
let defBox = document.querySelector('.def')
let audioBox=document.querySelector('.audio')
let loading=document.querySelector('.loading');




let api_key=''

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()

    // clear data 
    audioBox.innerHTML='';
    notFound.innerText='';
    defBox.innerText='';

    // alert('clicked')
    
    // get the input data
    let word =input.value
    if (word===""){

        alert('empty word cannot be searched')

        return;
    }
    //call the api  get data
    getData(word);
}
)

async function getData(word){
    // ajax calls
  
    loading.style.display='block'
    
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api_key}`)
    
     const data = await response.json()
     console.log(data)
    
   
    if (!data.length){
        loading.style.display='none'
        notFound.innerText='No results found'
        return 
    }
    // console.log(data)
    

    // if result is suggestions 
    if (typeof data[0]==='string'){
        loading.style.display='none'
        let heading =document.createElement('h3');
        heading.innerText='Did you mean?'
        notFound.appendChild(heading)
        data.forEach(element =>{
            let suggetion= document.createElement('span');
            suggetion.classList.add('suggested')
            suggetion.innerText=element;
            notFound.appendChild(suggetion)
        })

        return;

    }

    // Result found
    loading.style.display='none'

    let defination =data[0].shortdef[0];
    defBox.innerText=defination


    // sound 

const soundName=data[0].hwi.prs[0].sound.audio;

    if (soundName){
        renderSound(soundName);
    }
    
}

function renderSound(soundName){

    let subfolder =soundName.charAt(0);
    let soundSrc= `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${api_key}`;

let aud =document.createElement('audio');
aud.src=soundSrc
aud.controls=true
audioBox.appendChild(aud)

}