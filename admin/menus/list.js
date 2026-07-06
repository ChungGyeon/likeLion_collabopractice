document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-grid');
    // localStorage에서 데이터 불러오기 (없으면 빈 배열)
    const menus = JSON.parse(localStorage.getItem('cafe_menus')) || [];

    if (menus.length === 0) {
        menuGrid.innerHTML = '<p style="text-align:center; width:100%;">등록된 메뉴가 없습니다.</p>';
        return;
    }

    menus.forEach(menu => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.onclick = () => location.href = `detail.html?id=${menu.id}`; // 상세 페이지로 이동
        
        card.innerHTML = `
            <span class="category">${menu.category}</span>
            <h3>${menu.name}</h3>
            <p class="price">₩${menu.price.toLocaleString()}</p>
        `;
        menuGrid.appendChild(card);
    });
});