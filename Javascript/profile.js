async function fillUserInfo(userId)
{
    let user = await getUser(userId);   
    if (user == null) return;
    
    document.getElementById("user-info-image").setAttribute("src",user.profile_image);
    document.getElementById("user-info-username").innerText = user.username;
    document.getElementById("user-info-name").innerText = user.name;
    document.getElementById("user-info-email").innerText = user.email;
    document.getElementById("posts-count").innerText = user.posts_count;
    document.getElementById("comments-count").innerText = user.comments_count;
    document.getElementById("posts-title").innerText = `${user.name}'s Posts`;

}

function getPosts(userId)
{
    document.getElementById("loader").classList.toggle('d-none', false);
    axios.get(`${baseUrl}/users/${userId}/posts`)
    .then(response => {

        const posts = response.data.data;
        let postsContainer = document.getElementById('user-posts');
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
    })
    .finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });

}

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");


