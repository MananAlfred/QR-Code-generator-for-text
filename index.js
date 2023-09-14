const qrFormEl = document.getElementById('qrForm');
const qrContainerEl = document.getElementById('qrContainer');
const qrImageEl = document.getElementById('qrImage');
const qrInputTextEl = document.getElementById('qrInputText');
const generateBtnEl = document.getElementById('generateBtn');
const previousInput = '';


const renderUrl = (qrCodeUrl) =>{
  
  generateBtnEl.innerText = 'Loading...';

  if(!qrCodeUrl){
    return
  }
  qrImageEl.src = qrCodeUrl;
  
  const onImageLoad = () =>{

    const interval = setInterval(()=>{
      qrContainerEl.classList.add('show');
      clearInterval(interval);
      generateBtnEl.innerText = 'Generate QR Code';

    },500);

  };
  
  qrImageEl.addEventListener('load',onImageLoad);
};

const generator = (event) =>{
  event.preventDefault();

  const formData = new FormData(qrFormEl);
  const text = formData.get('qrText');
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;

  renderUrl(qrCodeUrl);
};
  
qrFormEl.addEventListener('submit',generator);

qrInputTextEl.addEventListener('keyup',() =>{

  if(qrInputTextEl.value.trim() === '')
  {
    qrContainerEl.classList.remove('show');
  }
});

qrInputTextEl.addEventListener('keydown',(event) =>{
  if(event.key === 'Enter'){
    generator();
  }
});
