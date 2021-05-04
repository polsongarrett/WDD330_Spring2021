const links = [
  {
    label: "Week 01",
    url: "week01/index.html"
  },
  {
    label: "Week 02",
    url: "week02/index.html"
  },
  {
    label: "Week 03",
    url: "week03/index.html"
  },
  {
    label: "Week 04",
    url: "week04/index.html"
  },
  {
    label: "Week 05",
    url: "week05/index.html"
  },
  {
    label: "Week 06",
    url: "week06/index.html"
  },
  {
    label: "Week 07",
    url: "week07/index.html"
  },
  {
    label: "Week 08",
    url: "week08/index.html"
  },
  {
    label: "Week 09",
    url: "week09/index.html"
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

