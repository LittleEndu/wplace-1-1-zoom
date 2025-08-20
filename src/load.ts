export default () => {
  const zoomIn = document.querySelector('button[title="Zoom in"]');
  if (!zoomIn) return;
  const zoomDiv = zoomIn.parentElement;
  if (!zoomDiv) return;
  const zoom11 = document.createElement("button");
  zoom11.innerText = "1:1";
  zoom11.className = zoomIn.className;
  zoom11.addEventListener("click", () => {
    const map = window.charity.game.map;
    map.flyTo({ center: map.getCenter(), zoom: 11.966 });
  });
  zoomDiv.appendChild(zoom11);
};
