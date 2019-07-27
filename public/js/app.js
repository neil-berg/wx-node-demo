const weatherForm = document.querySelector('form');
const responseMessage = document.querySelector('.response-message');

const fetchForecast = async address => {
  // Development endpoint:
  // const url = await `http://localhost:3000/weather?address=${address}`;
  // Production endpoint:
  const url = await `/weather?address=${address}`;
  try {
    responseMessage.textContent = `Finding forecast for ${address}...`;
    const res = await fetch(url);
    const data = await res.json();
    responseMessage.textContent = data.summary;
  } catch (error) {
    responseMessage.textContent = error;
  }
};

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchInput = document.querySelector('input');
  const address = searchInput.value;
  if (address) {
    fetchForecast(address);
  } else {
    responseMessage.textContent = 'Please enter a valid address';
  }
});
