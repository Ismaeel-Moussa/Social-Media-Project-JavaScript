

window.addEventListener("scroll", () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.scrollHeight;
    let currentPage = Number(localStorage.getItem("currentPage"));
    let lastPage = Number(localStorage.getItem("lastPage"));
    if (endOfPage && currentPage < lastPage) {

        loadPosts(false ,currentPage + 1);
    }
});

function loadPosts(reload = true, pageNumber = 1, ) 
{
    document.getElementById("loader").classList.toggle('d-none', false);
    axios.get(`${baseUrl}/posts?limit=5&page=${pageNumber}`)
    .then(response => {
        const posts = response.data.data;
        let postsContainer = document.getElementById('posts');
        if (reload)
            postsContainer.innerHTML = '';
        
        for(let post of posts) 
            {
                try {
                    postsContainer.innerHTML += generatePostHTML(post, true, false);
                    
                } catch (error) {
                    console.log(error.message);
                    
                }
                let tagsContainer = document.getElementById(`post-tags-${post.id}`);
                tagsContainer.innerHTML = '';
                for(let tag of post.tags) {
                    tagsContainer.innerHTML += `<span class="badge bg-secondary fs-6">${tag.name}</span>`;
                }
        };

        localStorage.setItem("currentPage",response.data.meta.current_page);
        localStorage.setItem("lastPage",response.data.meta.last_page);
    }).finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });
}



