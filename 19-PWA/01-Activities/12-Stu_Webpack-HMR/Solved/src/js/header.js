export const headerClick = () => {
  const header = document.getElementById('header');
  header.style.fontSize = '60px';
  if (header.style.color === 'blue') {
    header.style.color = 'red';
  } else {
    header.style.color = 'blue'; 
  }
};
