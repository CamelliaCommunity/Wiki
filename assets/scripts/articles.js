// Script for adding content wedge with each h2 element


// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
// Highlight Contents wedge when user is in a new section of the page
// Combined code to display new sections and highlight them
const sections = document.querySelectorAll('h2[id]');
const sectionsh3 = document.querySelectorAll('h3[id]');
const wedgeItems = document.getElementById('wedgeItems');
// Scroll to item
const observer = new IntersectionObserver((entries) => {
  entries.forEach((sectionEntry) => {
    const id = sectionEntry.target.getAttribute('id');
    const wedgeLink =
        document.querySelector(`nav li a[href="#${id}"]`).parentElement;
    if (sectionEntry.isIntersecting) {
      wedgeLink.classList.add('active');
    } else {
      wedgeLink.classList.remove('active');
    }
  });
});

// Display the sections in the content wedge
sections.forEach((section) => {
  const id = section.getAttribute('id');
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${id}`;
  link.textContent = section.textContent;
  listItem.appendChild(link);

  // const subList = document.createElement('ul');

  // Append the h3 sections as subitems
  // sectionsh3.forEach((h3Section) => {
  //   const h3Id = h3Section.getAttribute('id');
  //   const h3ListItem = document.createElement('li');
  //   const h3Link = document.createElement('a');
  //   h3Link.href = `#${h3Id}`;
  //   h3Link.textContent = h3Section.textContent;
  //   h3ListItem.appendChild(h3Link);
  //   subList.appendChild(h3ListItem);

  //   // Track all h3 sections that have an id applied
  //   observer.observe(h3Section);
  // });

  // listItem.appendChild(subList);
  wedgeItems.querySelector('ol').appendChild(listItem);

  // Track all sections that have an id applied
  observer.observe(section);
});

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
  figure.classList.add('articlePicture');  // Add the .articlePicture class

  figure.classList.add(image.width > 340 ? 'centerImage' : 'floatImage');

  image.replaceWith(figure);
});

// Test code
sections.forEach(section => {
  const id = section.getAttribute('id');
  console.log(id);
});