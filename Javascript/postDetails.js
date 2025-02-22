
function getPost() 
{
    document.getElementById("loader").classList.toggle('d-none', false);

    axios.get(`${baseUrl}/posts/${postId}`)
    .then(response => {
        const post = response.data.data;   
        document.getElementById("content-container").innerHTML = generatePostHTML(post, true, true);
    })    
    .finally(() => {     
        document.getElementById("loader").classList.toggle('d-none', true);
    });
}

function createCommentClicked()
{
    let commentBody = document.getElementById("comment-input").value;

    let params = {
        body: commentBody
    };

    let token = `Bearer ${localStorage.getItem("token")}`;

    let url = `${baseUrl}/posts/${postId}/comments`;

    axios.post(url, params, {
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        showAlert("Comment Created Successfully.", 'success');
        getPost(postId);
    })
    .catch(error => {
        showAlert(`Comment Creation Failed, ${error.response.data.message}`, 'danger');
    });
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");




