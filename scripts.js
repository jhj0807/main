// 사용자 이름 설정 (예시)
document.getElementById('userName').innerText = "홍길동";  // 로그인된 사용자의 이름을 서버에서 가져와야 함

// 로그아웃 처리
function logout() {
  fetch('https://agile-shelf-95856-4afc781e092f.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('로그아웃 성공!');
      window.location.href = 'index.html';  // 로그아웃 후 로그인 페이지로 리디렉션
    } else {
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  })
  .catch(error => {
    console.error('로그아웃 오류:', error);
    alert('로그아웃 중 오류가 발생했습니다.');
  });
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