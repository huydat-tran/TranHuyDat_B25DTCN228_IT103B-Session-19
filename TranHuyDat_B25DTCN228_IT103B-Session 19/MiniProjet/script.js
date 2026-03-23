let products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth TWS",
    price: 320000,
    image:
      "https://wallpapers.com/images/hd/johnny-sins-youtube-video-wmj4aty0v0wu8rrx.jpg",
    description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.",
  },
  {
    id: 2,
    name: "Bàn phím cơ 87 phím",
    price: 790000,
    image:
      "https://facts.net/wp-content/uploads/2023/10/22-astounding-facts-about-johnny-sins-1696433310.jpg",
    description: "Switch blue, led trắng, gõ sướng tay.",
  },
  {
    id: 3,
    name: "Chuột không dây công thái học",
    price: 450000,
    image: "https://wikibio.in/wp-content/uploads/2019/02/Johnny-Sins.jpg",
    description: "Thiết kế ergonomic, sạc USB-C.",
  },
  {
    id: 4,
    name: "USB 64GB",
    price: 120000,
    image:
      "https://starsunfolded.com/wp-content/uploads/2018/06/Johnny-Sins-smoking.jpg",
    description: "Nhỏ gọn, tốc độ đọc/ghi ổn định.",
  },
  {
    id: 5,
    name: "Đế tản nhiệt laptop",
    price: 210000,
    image:
      "https://uploads.metropoles.com/wp-content/uploads/2023/06/07120335/ator-porno-johnny-sins.jpg",
    description: "2 quạt gió, đỡ mỏi cổ tay.",
  },
  {
    id: 6,
    name: "Cáp sạc Type-C 1m",
    price: 80000,
    image:
      "https://i.pinimg.com/originals/9c/39/e2/9c39e2ab0982b90b8973727cf10ba4cb.jpg",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
];

const cardList = document.querySelector("#products-grid");
const cartBody = document.querySelector("#cart-tbody");
let cart = [];

const formatMoney = (money) => {
  return money.toLocaleString("vi-VN") + " VNĐ";
};

let saveData = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

let loadData = () => {
  const data = localStorage.getItem("products");
  if (data) products = JSON.parse(data);
};

let init = () => {
  loadData();
  updateUI();
};

let updateUI = () => {
  cardList.innerHTML = renderProducts(products);
  renderCart();
};
let renderProducts = (list) => {
  return list
    .map((p) => {
      return `
         <article class="card">
              <div class="card-img">
                <img
                  src ="${p.image}"
                  alt ="${p.name}"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title">${p.name}</h3>
                <p class="card-desc">${p.description}</p>
                <div class="card-footer">
                  <div class="price">${formatMoney(p.price)}</div>
                  <button class="btn btn-primary add-to-cart" data-id="${p.id}">Thêm vào giỏ</button>
                </div>
              </div>
            </article>
        `;
    })
    .join("");
};

cardList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = +e.target.dataset.id;
    addCart(id);
  }
});

let addCart = (id) => {
  const exist = cart.find((c) => c.id === id);
  if (exist) exist.quantity += 1;
  else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }
  updateUI();
};

let renderCart = () => {
  let html = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return `
      <tr>
          <td>${product.name}</td>
          <td class="right">${formatMoney(product.price)}</td>
          <td class="center">${item.quantity}</td>
          <td class="right">${formatMoney(product.price * item.quantity)}</td>
          <td class="center btn-delete" data-id="${item.id}>Xóa</td>
        </tr>
    `;
    })
    .join("");
  cartBody.innerHTML = html;
  updateStats();
};

let updateStats = () => {
  let totalQuantity = 0;
  let totalMoney = 0;

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    totalQuantity += item.quantity;
    totalMoney += product.price * item.quantity;
  });
  document.querySelector("#stat-lines").innerText = cart.length;
  document.querySelector("#stat-qty").innerText = totalQuantity;
  document.querySelector("#cart-lines-badge").innerText = cart.length;
  document.querySelector("#cart-qty-badge").innerText = totalQuantity + " món";
  document.querySelector("#stat-total").innerText = formatMoney(totalMoney);
};

init();

cartBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = +e.target.dataset.id;
    deleteItem(id);
  }
});

let deleteItem = (id) => {
  const product = products.find((p) => p.id === id);
  const isConfirm = confirm(`Xóa "${product.name}" khỏi giỏ hàng?`);

  if (!isConfirm) return;

  cart = cart.filter((item) => item.id !== id);

  updateUI();
};
