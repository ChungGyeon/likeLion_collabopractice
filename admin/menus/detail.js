document.addEventListener('DOMContentLoaded', () => {
    // 1. URL에서 ID 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = urlParams.get('id');

    const menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];
    const menu = menus.find(m => m.id === menuId);

    const detailPanel = document.getElementById('detail-panel');

    // 2. 데이터가 없으면 목록으로 튕겨내기
    if (!menu) {
        alert('존재하지 않는 메뉴입니다.');
        location.href = 'list.html';
        return;
    }

    // 3. 화면 렌더링
    detailPanel.innerHTML = `
        <span class="category-badge">${menu.category === 'coffee' ? '커피' : menu.category === 'beverage' ? '음료' : '디저트'}</span>
        <h2 class="menu-name">${menu.name}</h2>
        <div class="menu-price">₩${menu.price.toLocaleString()}</div>
        <p class="menu-desc">${menu.description || '설명이 없습니다.'}</p>
        
        <div class="action-buttons">
            <button class="btn-back" onclick="location.href='list.html'">목록</button>
            <button class="btn-edit" onclick="location.href='edit.html?id=${menu.id}'">수정</button>
            <button class="btn-delete" onclick="deleteMenu('${menu.id}')">삭제</button>
        </div>
    `;
});

// 4. 삭제 기능
function deleteMenu(id) {
    if (confirm('정말 이 메뉴를 삭제하시겠습니까?')) {
        let menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];
        menus = menus.filter(m => m.id !== id);
        localStorage.setItem('cafe_menus', JSON.stringify(menus));
        
        alert('삭제되었습니다.');
        location.href = 'list.html';
    }
}