// 탭 전환 함수
function showTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginTab = document.querySelector('.tab-btn.active');

  if (tab === 'login') {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginTab.classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
  } else {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    loginTab.classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
  }
}

// 회원 가입 처리
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  // 사용자 정보를 로컬 스토리지에 저장
  localStorage.setItem(email, JSON.stringify({ name, password }));
  
  alert('회원 가입 성공!');
  showTab('login');  // 회원 가입 후 로그인 화면으로 전환
});

// 로그인 처리
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value();

  // 로컬 스토리지에서 저장된 사용자 정보 가져오기
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    alert('로그인 성공!');

    // 로그인된 사용자의 이름을 페이지에 표시
    document.getElementById('userName').innerText = user.name;  // 로그인된 사용자의 이름

    window.location.href = 'https://jhj0807.github.io/main/';  // 로그인 성공 시 페이지 이동
  } else {
    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
});

// 로그아웃 처리
function logout() {
  // 로그아웃 후 사용자 이름을 초기화
  document.getElementById('userName').innerText = "홍길동";  // 기본값으로 이름 설정

  // 로그아웃 처리
  alert('로그아웃 성공!');
  window.location.href = 'https://jhj0807.github.io/book/';  // 로그아웃 후 로그인 페이지로 리디렉션
}

// Google Books API에서 베스트셀러 도서 목록 가져오기
fetch('https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=6')
  .then(response => response.json())
  .then(data => {
    const bookListContainer = document.getElementById('bookList');
    
    // 데이터를 제목을 기준으로 알파벳순으로 정렬
    const sortedBooks = data.items.sort((a, b) => {
      const titleA = a.volumeInfo.title.toUpperCase();
      const titleB = b.volumeInfo.title.toUpperCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });

    // 정렬된 도서 목록을 HTML에 추가
    sortedBooks.forEach(item => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      
      const title = item.volumeInfo.title;
      const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '저자 정보 없음';
      const imageUrl = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200';
      
      bookCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h4>${title}</h4>
        <p>${author}</p>
      `;
      
      bookListContainer.appendChild(bookCard);
    });
  })
  .catch(error => {
    console.error('도서 목록을 불러오는 중 오류가 발생했습니다:', error);
    alert('도서 목록을 불러오는 중 오류가 발생했습니다.');
  });