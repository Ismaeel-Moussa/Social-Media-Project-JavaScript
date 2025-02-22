
const baseUrl = 'https://tarmeezacademy.com/api/v1';

function loginBtnClicked() 
{

    document.getElementById("loader").classList.toggle('d-none', false);
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    
    const params = {
        username: username,
        password: password
    }
    axios.post(`${baseUrl}/login`, params)
    .then(response => {
                
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        const model = document.getElementById("login-modal");
        const modalInstance = bootstrap.Modal.getInstance(model);
        modalInstance.hide();

        loadContent();
        showAlert('Logged in successfully.', 'success');
    })
    .catch(error => {  
        showAlert(`Login failed,  ${error.response.data.message}`, 'danger');
    })
    .finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });

}

function registerBtnClicked() 
{
    document.getElementById("loader").classList.toggle('d-none', true);

    let name = document.getElementById("register-name-input").value;
    let username = document.getElementById("register-username-input").value;
    let email = document.getElementById("register-email-input").value;
    let password = document.getElementById("register-password-input").value;
    let image = document.getElementById("register-image-input").files[0];     

    let formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    

    axios.post(`${baseUrl}/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        const model = document.getElementById("register-modal");
        const modalInstance = bootstrap.Modal.getInstance(model);
        modalInstance.hide();

        loadContent();
        showAlert('Registered successfully.', 'success');
    })
    .catch(error => {      
        showAlert(`Regitration failed, ${error.response.data.message}`, 'danger');
    })
    .finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });
}

function showAlert(message, type) 
{
    const alertPlaceholder = document.getElementById('success-alert');
    const wrapper = document.createElement('div');

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);

    const alertElement = alertPlaceholder.lastChild;
    setTimeout(() => {
        alertElement.remove();
    }, 3000);

}

function setUpUI() {
    try { 

        const isHomePage = window.location.pathname.toLowerCase().includes('home');
        const isPostDetailsPage = window.location.pathname.toLowerCase().includes('postdetails');
        const isProfilePage = window.location.pathname.toLowerCase().includes('profile');
        const loginDiv = document.getElementById('login-div');
        const logoutDiv = document.getElementById('logout-div');
        const addPostBtn = document.getElementById('add-post-btn');
        const addCommentDiv = document.getElementById('add-comment-div');
        const token = localStorage.getItem('token');
        const isLoggedIn = !!token;


        if (isHomePage) loadPosts();
        if (isPostDetailsPage) getPost();

        if (loginDiv) loginDiv.classList.toggle('d-none', isLoggedIn);
        if (logoutDiv) logoutDiv.classList.toggle('d-none', !isLoggedIn);
        if (addCommentDiv) addCommentDiv.classList.toggle('d-none', !isLoggedIn);
        if (addPostBtn && isHomePage || isProfilePage) addPostBtn.classList.toggle('d-none', !isLoggedIn);     

        // 4. Update user info if logged in
        if (isLoggedIn) {
            try {
                const currentUser = getCurrentUser();
                if (!currentUser) {
                    console.warn('User data not found in localStorage');
                    return;
                }

                const currentUserImage = document.getElementById('current-user-image');
                const currentUserUsername = document.getElementById('current-user-username');

                if (currentUserImage) {
                    currentUserImage.src = currentUser.profile_image || './default-profile.png';
                }
                
                if (currentUserUsername) {
                    currentUserUsername.textContent = currentUser.username || 'Unknown User';
                }
            } catch (userError) {
                console.error('Error loading user data:', userError);
            }
        }
    } catch (error) {
        console.error('Error in setUpUI:', error);
    }
}

function logout() 
{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    loadContent();
    showAlert('Logged out successfully.', 'warning');
}

function getCurrentUser()
{
    let currentUser = localStorage.getItem("user");
    return currentUser !== null ? JSON.parse(currentUser) : null; 
}

function generatePostHTML(post, addPostModifyUser = false, addComments = false) {

    const author = post.author;
    let commentsSection = ``;
    if(addComments)
    {
        const comments = post.comments;
        let commentsContent = "";
        for(comment of comments)
        {
            commentsContent += `
                <!-- Comment -->
                <div class="p-4">
                    <div class="d-flex" onclick="userClicked(${comment.author.id})" style="cursor: pointer;">
                        <img src="${comment.author.profile_image}" alt="" class="rounded-circle" style="
                        width: 40px; 
                        height: 40px;
                        position: relative;
                        top: -6px;
                        margin-right: 10px;">
                        <b>${comment.author.username}</b>
                    </div>
                    <div style="padding-left: 6px">
                        ${comment.body}
                    </div>
                </div>
                <!--// Comment //-->
            `;
        }

        commentsSection = `
            <!-- Comments --> 
            <div class="rounded mt-2" id="comments" style="background-color: #ebebeb;">
                ${commentsContent}
            </div>
            <!--// Comments //--> 

            <div class="input-group mb-3 mt-3" id="add-comment-div">
                <input id="comment-input" type="text" placeholder="add your comment here..." class="form-control">
                <button class="btn btn-outline-primary" type="button" onclick="createCommentClicked()">Send</button>
            </div>
        `;
    }

    let postModifyDiv = ``;
    if (addPostModifyUser)
    {
        let currentUser = getCurrentUser();
        let isMyPost = currentUser != null && currentUser.id == author.id;
        if(isMyPost)
        {
            postModifyDiv = 
            `<div>
                <button class="btn btn-secondary" onclick="editPostBtnClicked(${post.id})">Edit</button>
                <button class="btn btn-danger" onclick="deletePostBtnClicked(${post.id})">Delete</button>
            </div>`;
        }
    }

    return `
    <!-- Post -->
    <div class="card shadow rounded mb-3 p-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <div onclick="userClicked(${author.id})" style="cursor: pointer;">
                <img src="${author.profile_image}" alt="" class="img-thumbnail rounded-circle" style="width: 50px; height: 50px;">
                <b>${author.username}</b>
            </div>
            ${postModifyDiv}
        </div>
        <div class="card-body mt-3" onclick="postClicked(${post.id})" style="cursor: pointer;">
            <img class="w-100" src="${post.image}" alt="">
            <h6 style="color: #777;" class="mt-1">${post.created_at}</h6>
            <h5>${post.title != null ? post.title: ""}</h5>
            <p>${post.body}</p>
            <hr>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                <span>(${post.comments_count}) Comments</span>
                <span id="post-tags-${post.id}"></span>
            </div>
        </div>
        ${commentsSection}
    </div>
    <!--// Post //--> `;
}

function createNewPostBtnClicked() 
{
    document.getElementById("loader").classList.toggle('d-none', false);
    let postId = document.getElementById("post-modal-submit-btn").getAttribute("data-post-id");
    let isCreate = postId == null || postId == "";

    let title = document.getElementById("post-title-input").value;
    let body = document.getElementById("post-body-input").value;
    let image = document.getElementById("post-image-input").files[0];

    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('image', image);

    isCreate ? '' : formData.append("_method", "put");

    const url = isCreate ? `${baseUrl}/posts` : `${baseUrl}/posts/${postId}`;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };

    axios.post(url, formData, config)
        .then(response => {
            const model = document.getElementById("create-post-modal");
            const modalInstance = bootstrap.Modal.getInstance(model);
            modalInstance.hide();
            showAlert(`Post ${isCreate ? 'created' : 'updated'} successfully.`, 'success');
            loadContent();
        })
        .catch(error => {
            showAlert(`Post ${isCreate ? 'creation' : 'update'} failed: ${error.response.data.message}`, 'danger');
        })
        .finally(() => {     
            document.getElementById("loader").classList.toggle('d-none', true);
        });

}

function postClicked(postId)
{
    window.location = `postDetails.html?postId=${postId}`;
}

async function editPostBtnClicked(postId)
{   
    let post = await getPostById(postId);
    if(post == null) return;
    document.getElementById("post-modal-title").innerText = "Edit Post";
    document.getElementById("post-modal-submit-btn").innerText = "Update"; 
    document.getElementById("post-title-input").value = post.title;
    document.getElementById("post-body-input").value = post.body;
    document.getElementById("post-modal-submit-btn").setAttribute("data-post-id",post.id);

    let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"), {});
    postModal.toggle();
}

function addBtnClicked()
{
    document.getElementById("post-modal-title").innerText = "Create A New Post";
    document.getElementById("post-modal-submit-btn").innerText = "Create"; 
    document.getElementById("post-image-input").value = "";
    document.getElementById("post-title-input").value = "";
    document.getElementById("post-body-input").value = "";
    document.getElementById("post-modal-submit-btn").setAttribute("data-post-id","");

    let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"), {});
    postModal.toggle();
}

function deletePostBtnClicked(postId)
{
    document.getElementById("delete-post-btn").setAttribute("data-post-id",postId);
    let postModal = new bootstrap.Modal(document.getElementById("delete-post-modal"), {});
    postModal.toggle();
}

function confirmPostDelete()
{
    document.getElementById("loader").classList.toggle('d-none', false);
    let postId = document.getElementById("delete-post-btn").getAttribute("data-post-id");

    let url = `${baseUrl}/posts/${postId}`;
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    axios.delete(url,config)
    .then(() => {
        const model = document.getElementById("delete-post-modal");
        const modalInstance = bootstrap.Modal.getInstance(model);
        modalInstance.hide();
        loadContent();
        showAlert("Post Deleted Successfully.","warning");
    })
    .catch(error => {
        showAlert(`Post Deletion Failed, ${error.response.data.message}`,"danger");

    })
    .finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });

}

function getPostById(postId) {
    let url = `${baseUrl}/posts/${postId}`;
    return axios.get(url)
        .then(response => response.data.data)
        .catch(error => {
            console.log(error.response.data.message);
            return null;
        });
}

function getUser(userId) {
    let url = `${baseUrl}/users/${userId}`;
    return axios.get(url)
        .then(response => response.data.data)
        .catch(error => {
            console.log(error.response.data.message);
            return null;
        });
}

function userClicked(userId = null){
    
    if (userId == null)
    {
        let currentUser = getCurrentUser();
        if (currentUser === null){
            showAlert("You must login or register", "danger");
        }
        let userId = currentUser.id;
        window.location = `profile.html?userId=${userId}`;
        return;
    }

    window.location = `profile.html?userId=${userId}`;

}

function loadContent()
{
    setUpUI();
    const isHomePage = window.location.pathname.toLowerCase().includes('home');
    const isPostDetailsPage = window.location.pathname.toLowerCase().includes('postdetails');
    const isProfilePage = window.location.pathname.toLowerCase().includes('profile');

    if (isHomePage) loadPosts();
    if (isPostDetailsPage) getPost();
    if (isProfilePage) 
    {
            getPosts(userId);
            fillUserInfo(userId);
    }
}
