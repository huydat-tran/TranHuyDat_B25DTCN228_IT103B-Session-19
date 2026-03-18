let contacts = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    number: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    number: "0912345678",
    email: "tranthibinh@email.com",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    number: "0923456789",
    email: "levancuong@email.com",
  },
  {
    id: 4,
    name: "Phạm Thị Dung ",
    number: "0934567890",
    email: "phamthidung@email.com",
  },
  {
    id: 5,
    name: "Hoàng Văn Em ",
    number: "0945678901",
    email: "hoangvanem@email.com",
  },
];

const tbody = document.querySelector("#contact-tbody");
const form = document.querySelector("#contact-form");
let editID = null;

const renderList = (contacts) => {
  return contacts
    .map((c, i) => {
      return `
    <tr data-id="${c.id}">
                <td>${i + 1}</td>
                <td>${c.name}</td>
                <td>${c.number}</td>
                <td>${c.email}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit">Sửa</button>
                    <button class="btn-cancel">Hủy</button>
                    <button class="btn-delete">Xóa</button>
                  </div>
                </td>
              </tr>
    `;
    })
    .join("");
};

const updateUI = () => {
  tbody.innerHTML = renderList(contacts);
};

const validateForm = (name, number, email) => {
  if (!name || !email || isNaN(number) || number == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Không được để trống",
    });
    return false;
  }
  return true;
};

updateUI();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#contact-name").value.trim();
  const number = document.querySelector("#contact-phone").value.trim();
  const email = document.querySelector("#contact-email").value.trim();

  if (!validateForm(name, number, email)) return;

  if (editID !== null) {
    const contact = contacts.find((c) => c.id === editID);

    contact.name = name;
    contact.number = number;
    contact.email = email;
    editID = null;

    document.querySelector(".btn-add").textContent = "Thêm";

    updateUI();
    form.reset();
  }
});

const editContact = (id) => {
  const contact = contacts.find((c) => c.id === id);

  document.querySelector("#contact-name").value = contact.name;
  document.querySelector("#contact-phone").value = contact.number;
  document.querySelector("#contact-email").value = contact.email;

  editID = id;
  document.querySelector(".btn-add").textContent = "Cập nhập";
  document.querySelector(".btn-cancel").style.display = "inline-block";
  document.querySelector(".btn-delete").style.display = "none";
};

tbody.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  if (!tr) return;

  const id = +tr.dataset.id;

  if (e.target.classList.contains("btn-edit")) {
    editContact(id);
  }
  if (e.target.classList.contains("btn-delete")) {
    contacts = contacts.filter((c) => c.id !== id);
    updateUI();
  }
});
