import { menuData, categoryData } from '../js/data.js';
import { formatPrice, updateCartBadge } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    renderMenuList('all');
    updateCartBadge();
});

function initCategories() {
    const tabContainer = document.getElementById('category-tabs');
    
    // 전체 보기 탭 추가
    const allTab = document.createElement('button');
    allTab.className = 'tab-item active';
    allTab.innerText = '전체';
    allTab.onclick = (e) => switchCategory(e, 'all');
    tabContainer.appendChild(allTab);

    // 공통 데이터 연동 생성
    categoryData.forEach(cat => {
        const tab = document.createElement('button');
        tab.className = 'tab-item';
        tab.innerText = cat.name;
        tab.onclick = (e) => switchCategory(e, cat.id);
        tabContainer.appendChild(tab);
    });
}

function switchCategory(e, id) {
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    renderMenuList(id);
}

function renderMenuList(categoryId) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';

    const filteredMenu = categoryId === 'all' 
        ? menuData 
        : menuData.filter(item => item.categoryId === categoryId);

    filteredMenu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.onclick = () => window.location.href = `detail.html?id=${item.id}`;

        card.innerHTML = `
            <img src="${item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300'}" class="menu-img" alt="${item.name}">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <span class="menu-price">${formatPrice(item.price)}원</span>
            </div>
        `;
        grid.appendChild(card);
    });
}