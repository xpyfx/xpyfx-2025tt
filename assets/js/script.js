'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});

window.onload = function () {
  google.accounts.id.initialize({
      client_id: 'YOUR_CLIENT_ID',  // 使用你在 Google Cloud Platform 上取得的 Client ID
      callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
      document.getElementById('login-btn'), 
      { theme: 'outline', size: 'large' }
  );

  google.accounts.id.prompt();
  
  function handleCredentialResponse(response) {
    // 解碼 JWT Token，提取使用者資料
    const data = JSON.parse(atob(response.credential.split('.')[1]));

    const profilePic = document.getElementById('profile-pic');
    const loginBtn = document.getElementById('login-btn');

    // 顯示使用者頭像
    profilePic.src = data.picture;
    profilePic.style.display = 'block';
    loginBtn.style.display = 'none';

    // 點擊頭像登出
    profilePic.onclick = () => {
        google.accounts.id.disableAutoSelect();
        profilePic.style.display = 'none';
        loginBtn.style.display = 'block';

        // 呼叫登出 API，通知後端
        fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        });
    };
}


app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('登出失敗');
      }
      res.clearCookie('connect.sid');
      res.send('已登出');
  });
});

