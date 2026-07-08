const defaultMenus = [
    { id: 1, category: '커피', name: '아메리카노', price: 4500, status: '판매중', image: '☕️' },
    { id: 2, category: '커피', name: '카페 라떼', price: 5000, status: '판매중', image: '☕️' },
    { id: 3, category: '커피', name: '바닐라 라떼', price: 5500, status: '판매중', image: '☕️' },
    { id: 4, category: '커피', name: '콜드브루', price: 5000, status: '품절', image: '🧊' },
    { id: 5, category: '디저트', name: '초코무스 케이크', price: 6500, status: '판매중', image: '🍰' },
    { id: 6, category: '음료', name: '자몽 에이드', price: 5500, status: '판매중', image: '🍹' }
];

function loadMenus() {
    let menus = localStorage.getItem('cafeMenus');
    if (!menus) {
        localStorage.setItem('cafeMenus', JSON.stringify(defaultMenus));
        menus = defaultMenus;
    } else {
        menus = JSON.parse(menus);
    }

    const tbody = document.getElementById('menuTableBody');
    tbody.innerHTML = '';

    menus.forEach(menu => {
        const statusClass = menu.status === '판매중' ? 'badge completed' : 'badge pending';
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td><div class="menu-thumbnail">${menu.image}</div></td>
                <td><span class="category-tag">${menu.category}</span></td>
                <td class="menu-name">${menu.name}</td>
                <td>₩${menu.price.toLocaleString()}</td>
                <td><span class="${statusClass}">${menu.status}</span></td>
                <td>
                    <button class="btn-small edit">수정</button>
                    <button class="btn-small delete" onclick="deleteMenu(${menu.id})">삭제</button>
                </td>
            `;
        tbody.appendChild(tr);
    });
}

function deleteMenu(id) {
    if(confirm('정말 삭제하시겠습니까?')) {
        let menus = JSON.parse(localStorage.getItem('cafeMenus'));
        menus = menus.filter(menu => menu.id !== id);
        localStorage.setItem('cafeMenus', JSON.stringify(menus));
        loadMenus();
    }
}

document.addEventListener('DOMContentLoaded', loadMenus);