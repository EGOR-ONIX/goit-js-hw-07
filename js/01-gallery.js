import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
      </a>
</li>
`,
  ""
);

gallery.insertAdjacentHTML("beforeend", markup);

const instance = basicLightbox.create(`<img src="">`, {
  onShow: (instance) => {
    gallery.addEventListener("keydown", onEscPress);
  },
  onClose: (instance) => {
    gallery.removeEventListener("keydown", onEscPress);
  },
});

gallery.addEventListener("click", onClickImg);

function onClickImg(event) {
  event.preventDefault();

  const datasetSource = event.target.dataset.source;

  if (!datasetSource) return;

  instance.element().querySelector("img").src = datasetSource;
  instance.show();
}

function onEscPress(e) {
  if (e.code === "Escape") instance.close();
}
