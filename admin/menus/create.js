document.getElementById('create-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 새로고침 방지

    // 입력값 가져오기
    const newMenu = {
        id: Date.now().toString(), // 고유 ID 생성
        category: document.getElementById('category').value,
        name: document.getElementById('name').value,
        price: parseInt(document.getElementById('price').value),
        description: document.getElementById('description').value,
        createdAt: new Date().toISOString()
    };

    // 기존 데이터 불러오기 및 새 데이터 추가
    const menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];
    menus.push(newMenu);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('cafe_menus', JSON.stringify(menus));

    alert('메뉴가 성공적으로 등록되었습니다!');
    location.href = 'list.html'; // 목록 페이지로 이동
});