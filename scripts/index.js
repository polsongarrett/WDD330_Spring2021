const links = [
  {
    label: "Week 01",
    url: "../week1/index.html"
  },
  {
    label: "Week 02",
    url: "week2/index.html"
  },
  {
    label: "Week 03",
    url: "week3/index.html"
  },
  {
    label: "Week 04",
    url: "week4/index.html"
  },
  {
    label: "Week 05",
    url: "week5/index.html"
  },
  {
    label: "Week 06",
    url: "week6/index.html"
  },
  {
    label: "Week 07",
    url: "week7/index.html"
  },
  {
    label: "Week 08",
    url: "week8/index.html"
  },
  {
    label: "Week 09",
    url: "week9/index.html"
  },
  {
    label: "Week 10",
    url: "week10/index.html"
  },
  {
    label: "Week 11",
    url: "week11/index.html"
  },
  {
    label: "Week 12",
    url: "week12/index.html"
  },
  {
    label: "Week 13",
    url: "week13/index.html"
  },
  {
    label: "Week 14",
    url: "week14/index.html"
  }
];

ul = document.querySelector('ul');

links.forEach( 
  link => {
    ul.innerHTML += 
    `
    <li>
      <a href="${link.url}">${link.label}</a>
    </li>
    `;
  }
);

