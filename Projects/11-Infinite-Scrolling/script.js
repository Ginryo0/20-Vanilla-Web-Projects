const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  // you have to await getPosts -> cuz returns a promise
  const posts = await getPosts();
  console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    postEl.innerHTML = `<div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
      ${post.body}
      </p>
    </div>`;

    postContainer.appendChild(postEl);
  });
}

// Show loader & fetch new posts
function loadPosts() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = [...postContainer.children];

  // const posts = document.querySelectorAll('.post'); - another approach

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').textContent.toUpperCase();
    const body = post.querySelector('.post-body').textContent.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
  // another approach
  // if (title.includes(term) || body.includes(term)) {
  //   post.style.display = 'flex';
  // } else {
  //   post.style.display = 'none';
  // }
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  // console.dir(document.documentElement);
  // 3 props -> clientHeight = window (view port) height
  // scrollTop -> distance from body top
  // scrollHeight -> whole scrollable height = actual page height

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // if (scrollTop + clientHeight >= scrollHeight - 5) {

  //   loadPosts();
  // }

  // the previous formula -> bugged -> cuz when you scroll each pixel less than 5 from bot -> condition true -> fetch new posts -> you'll call loadPosts more than once on each scroll to bottom

  if (scrollTop + clientHeight === scrollHeight) {
    loadPosts();
  }
});

filter.addEventListener('input', filterPosts);
