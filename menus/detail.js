import { menuData } from '../js/data.js';
import { formatPrice, addToCart } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const menuId = params.get('id');
    const item = menuData.find(m => m.id === menuId);

    if (item) {
        renderDetail(item);
    } else {
        alert('존재하지 않는 메뉴입니다.');
        history.back();
    }
});

function renderDetail(item) {
    const container = document.getElementById('detail-container');
    document.getElementById('header-title').innerText = item.name;

    container.innerHTML = `
        <div class="detail-card">
            <img src="${item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'}" class="detail-img" alt="${item.name}">
            <div class="item-meta">
                <h2>${item.name}</h2>
                <p class="item-description">${item.description || '신선한 원두로 추출하여 깊은 풍미를 자랑하는 카페 대표 메뉴입니다.'}</p>
            </div>

            <div class="option-section">
                <div class="option-title">온도 선택</div>
                <div class="option-group">
                    <button class="option-btn selected" onclick="selectOption(this, 'ICE')">ICE</button>
                    <button class="option-btn" onclick="selectOption(this, 'HOT')">HOT</button>
                </div>
            </div>

            <div class="purchase-section">
                <div class="total-price-label">
                    <span id="total-price">${formatPrice(item.price)}</span>원
                </div>
                <button class="btn-add-basket" id="add-to-cart-btn">장바구니 담기</button>
            </div>
        </div>
    `;

    // 글로벌 스코프 바인딩 처리 (간단 템플릿용)
    window.selectOption = (btn, value) => {
        const siblings = btn.parentNode.querySelectorAll('.option-btn');
        siblings.forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');
        btn.dataset.value = value;
    };

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const selectedTemp = container.querySelector('.option-btn.selected')?.dataset.value || 'ICE';
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            option: selectedTemp,
            quantity: 1
        });
        alert(`${item.name}(${selectedTemp})이(가) 장바구니에 추가되었습니다.`);
    });
}