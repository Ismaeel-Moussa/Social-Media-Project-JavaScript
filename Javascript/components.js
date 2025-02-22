// components.js
function createLoader(){
    return` <!-- ======================== Loader ======================== -->
        <div class="lds-roller d-none" id="loader">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        `;
}

function createModals() {
    return `
        <!-- ======================== Modals ======================== -->
    <!-- Login Modal -->
    <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="username-input" class="col-form-label">Username</label>
                  <input type="text" class="form-control" id="username-input">
                </div>
                <div class="mb-3">
                  <label for="password-input" class="col-form-label">Password</label>
                  <input type="password" class="form-control" id="password-input">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="loginBtnClicked()">Login</button>
            </div>
          </div>
        </div>
      </div>
    <!--// Login Modal //-->
    <!-- Register Modal -->
    <div class="modal fade" id="register-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Register A New User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="register-profile-image" class="col-form-label">Profile Image</label>
                  <input type="file" class="form-control" id="register-image-input">
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="register-name-input" placeholder="Name">
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="register-username-input" placeholder="Username">
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="register-email-input" placeholder="Email">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" id="register-password-input" placeholder="Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="registerBtnClicked()">Register</button>
            </div>
          </div>
        </div>
      </div>
    <!--// Register Modal //-->
    <!-- Create Post Modal -->
        <div class="modal fade" id="create-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="post-modal-title">Create A New Post</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="">
                      <label for="post-title" class="col-form-label">Title</label>
                      <input type="text" class="form-control" id="post-title-input">
                    </div>
                    <div class="">
                    <label for="post-body-input" class="col-form-label">Body</label>
                      <textarea type="text" class="form-control" id="post-body-input"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="image-post-input" class="col-form-label">Image</label>
                        <input type="file" class="form-control" id="post-image-input">
                      </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button id="post-modal-submit-btn" type="button" class="btn btn-primary" onclick="createNewPostBtnClicked()">Create</button>
                </div>
              </div>
            </div>
          </div>
    <!--// Create Post Modal //-->
    <!-- Delete Post Modal -->
    <div class="modal fade" id="delete-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete the post? 
                <span id="delete-post-title"></span>
            </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>          
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button id="delete-post-btn" type="button" class="btn btn-danger" onclick="confirmPostDelete()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    <!--// Delete Post Modal //-->`;
}

function createAlerts() {
    return `
    <!-- ======================== Alerts ======================== -->
    <!-- Login Alert -->
    <div id="success-alert" class="show fade text-center" style="position: fixed; z-index: 9; width: 300px; bottom: 40px; right: 20px;"></div>
    <!--// Login Alert //-->
    `;
}

function createAddPostButton() {
    return `
    <!-- ==================== Add Post Button ==================== -->
    <div class="bg-primary d-none" id="add-post-btn" onclick="addBtnClicked()">+</div>
    `;
}

function createNavbar() {
    return `
    <!-- Navigation Bar Container -->
    <div class="container pt-3">
        <div class="d-flex justify-content-center">
            <div class="col-9">
                <nav class="navbar navbar-expand-lg bg-body-tertiary shadow rounded">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="./home.html">Tarmeez</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="./home.html">Home</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" onclick="userClicked()" style="cursor: pointer;">Profile</a>
                                </li>
                            </ul>       
                            <div class="d-flex w-100 justify-content-end gap-2" id="login-div">
                                <button id="login-btn" class="btn btn-outline-success" type="submit" data-bs-toggle="modal" data-bs-target="#login-modal">Login</button>
                                <button id="register-btn" class="btn btn-outline-success" type="submit" data-bs-toggle="modal" data-bs-target="#register-modal">Register</button>
                            </div>
                            <!-- For logged in users -->
                            <div class="d-flex w-100 justify-content-end align-items-center gap-2" id="logout-div">   
                                <img src="" alt="" class="rounded-circle" style="width: 40px; height: 40px;" id="current-user-image">
                                <b id="current-user-username">@username</b> 
                                <button id="logout-btn" class="btn btn-outline-danger" type="submit" data-bs-toggle="modal" onclick="logout()">Logout</button>
                            </div>
                            <!-- For logged in users -->
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <!--// Navigation Bar Container //-->
    `;
}

function initComponents() {
    document.body.insertAdjacentHTML('afterbegin', 
        createLoader() +
        createModals() + 
        createAlerts() + 
        createAddPostButton() +
        createNavbar()
    );
}

document.addEventListener('DOMContentLoaded', () => {
    initComponents();
    loadContent();
}); 