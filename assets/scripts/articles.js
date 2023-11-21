createWedge();

// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
// Highlight Contents wedge when user is in a new section of the page
// Combined code to display new sections and highlight them
function createWedge() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((sectionEntry) => {
      const id = sectionEntry.target.getAttribute('id');
      const wedgeLink =
          document.querySelector(`nav li a[href="#${id}"]`).parentElement;

      if (sectionEntry.isIntersecting)
        wedgeLink.classList.add('active');
      else
        wedgeLink.classList.remove('active');
    });
  });

  const cardContents = document.getElementsByClassName('cardContents')[0];
  const wedgeItems = document.getElementById('wedgeItems').querySelector('ol');

  let lastHeader = null;
  let currentList = null;

  /*
   * Loop through all children of the cardContents
   * so we know which h3s belong to which h2s
   */
  for (const child of cardContents.children) {
    if (child.classList.contains('cardHeader')) {
      if (currentList) {
        lastHeader.appendChild(currentList);
        currentList = null;
        lastHeader = null;
      }

      const h2 = child.querySelector('h2');

      const id = h2.getAttribute('id');
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = h2.textContent;
      listItem.appendChild(link);
      wedgeItems.appendChild(listItem);

      lastHeader = listItem;
      observer.observe(h2);
    }

    if (child.tagName == 'H3') {
      if (!lastHeader)  // in case someone puts an h3 before an h2
        continue;

      if (currentList == null) currentList = document.createElement('ul');

      const subId = child.getAttribute('id');
      const subItem = document.createElement('li');
      const subLink = document.createElement('a');
      subLink.href = `#${subId}`;
      subLink.textContent = child.textContent;
      subItem.appendChild(subLink);
      currentList.appendChild(subItem);

      observer.observe(child);
    }
  }

  // add the last header and list to the wedge
  if (lastHeader) {
    wedgeItems.appendChild(lastHeader);

    if (currentList) {
      lastHeader.appendChild(currentList);
      currentList = null;
    }

    lastHeader = null;
  }
}

// Look for images within a "p" element, give them a figure and figcaption
// element. the alt text will display as figcaption
// We will also look for images within figures, if the image is wider than
// 340 pixels, it will remove the float and margins
const images = document.querySelectorAll('p > img');
images.forEach((image) => {
  const figure = document.createElement('figure');
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = image.alt;
  figure.appendChild(image.cloneNode(true));
  figure.appendChild(figcaption);

  figure.classList.add(image.width > 340 ? 'centerImage' : 'floatImage');

  image.replaceWith(figure);
});