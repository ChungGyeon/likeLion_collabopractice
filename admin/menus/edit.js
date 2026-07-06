// 전역 변수로 사용할 menuId
let currentMenuId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. URL에서 ID 추출
    const urlParams = new URLSearchParams(window.location.search);
    currentMenuId = urlParams.get('id');

    const menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];
    const menu = menus.find(m => m.id === currentMenuId);

    if (!menu) {
        alert('존재하지 않는 메뉴입니다.');
        location.href = 'list.html';
        return;
    }

    // 2. 폼에 기존 데이터 미리 채워넣기 (초기 세팅)
    document.getElementById('category').value = menu.category;
    document.getElementById('name').value = menu.name;
    document.getElementById('price').value = menu.price;
    document.getElementById('description').value = menu.description || '';
});

// 3. 수정 폼 제출 시 데이터 덮어쓰기
document.getElementById('edit-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];
    const menuIndex = menus.findIndex(m => m.id === currentMenuId);

    if (menuIndex !== -1) {
        // 기존 데이터를 새 입력값으로 덮어쓰기 (생성일자 등은 유지)
        menus[menuIndex] = {
            ...menus[menuIndex],
            category: document.getElementById('category').value,
            name: document.getElementById('name').value,
            price: parseInt(document.getElementById('price').value),
            description: document.getElementById('description').value,
        };

        localStorage.setItem('cafe_menus', JSON.stringify(menus));
        alert('메뉴가 수정되었습니다.');
        
        // 수정한 메뉴의 상세 페이지로 돌아가기
        location.href = `detail.html?id=${currentMenuId}`;
    }
});