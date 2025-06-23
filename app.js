let currentUser = null; // 
const firebaseConfig = {
  apiKey: "AIzaSyB-wSG39IWRS2uvJh-a9roqLZjOMRMUV7s",
  authDomain: "swiftshop-ea783.firebaseapp.com",
  projectId: "swiftshop-ea783"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Global products list for search filtering
let allProducts = [];

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(products => {
        allProducts = products;
        renderProducts(products); // this can now access currentUser
      });
  }
});


//  Fetch products from FakeStoreAPI and render them
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    renderProducts(products);
  });

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h2 title="${product.title}">${product.title.slice(0, 30)}...</h2>
      <img src="${product.image}" alt="${product.title}">
      <p>₹${product.price}</p>
      <a href="product.html?id=${product.id}">
        <button class="details-btn" style="margin-bottom: 6px;">🔍 View Details</button>
      </a>
      <button class="add-btn">🛒 Add to Cart</button>
    `;

    // Only bind 'Add to Cart' button
    const addBtn = div.querySelector(".add-btn");
    addBtn.addEventListener("click", () => {
      if (currentUser) {
        addToCart(currentUser.uid, product);
      } else {
        alert("Please login to add to cart.");
      }
    });

    container.appendChild(div);
  });
}

//  Filter products based on search
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Add product to Firestore cart
function addToCart(uid, product) {
  const cartRef = db.collection("users").doc(uid).collection("cart").doc(product.id.toString());
  cartRef.get().then(doc => {
    if (doc.exists) {
      // Increment quantity if already exists
      cartRef.update({
        quantity: firebase.firestore.FieldValue.increment(1)
      });
    } else {
      cartRef.set({
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  });
  alert(" Added to cart!");

}

//  Logout function
function logout() {
  auth.signOut().then(() => window.location.href = "login.html");
}
