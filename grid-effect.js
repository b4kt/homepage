const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0;

const createTile = index => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  
  const greenOpacity = Math.random() * 0.3 + 0.1;
  const purpleOpacity = Math.random() * 0.3 + 0.1;
  
  const color = Math.random() > 0.5 ? 
    `0 0 4px rgba(0, 255, 0, ${greenOpacity})` : 
    `0 0 4px rgba(153, 0, 255, ${purpleOpacity})`;
    
  tile.style.boxShadow = color;
  tile.style.opacity = 0.9 + (Math.random() * 0.1);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).forEach((_, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
  
  smoothPulseAnimation();
}

const smoothPulseAnimation = () => {
  const tiles = document.querySelectorAll(".tile");

  for (let i = 0; i < 4; i++) {
    const subset = Array.from(tiles).filter((_, index) => index % 4 === i);
    
    anime({
      targets: subset,
      opacity: [
        {value: 0.9, duration: 2000, easing: 'easeInOutQuad'},
        {value: 1, duration: 2000, easing: 'easeInOutQuad'}
      ],
      boxShadow: [
        {value: '0 0 3px rgba(0, 255, 0, 0.3)', duration: 2000, easing: 'easeInOutQuad'},
        {value: '0 0 6px rgba(153, 0, 255, 0.5)', duration: 2000, easing: 'easeInOutQuad'},
        {value: '0 0 3px rgba(0, 255, 0, 0.3)', duration: 2000, easing: 'easeInOutQuad'}
      ],
      delay: i * 500,
      duration: 6000,
      loop: true,
      direction: 'normal'
    });
  }
}

createGrid();

window.addEventListener('resize', createGrid);
