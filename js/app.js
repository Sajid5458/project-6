// load data function
const loadData = () => {
    const inputFeild = document.getElementById('search-feild');
    const emptyInput = document.getElementById('empty-input');
    const inputFeildText = inputFeild.value;
    // error messages 
    if (inputFeild.value === '') {
        emptyInput.classList.remove('d-none');
    } else {
        // api links
        const url = `https://openlibrary.org/search.json?q=${inputFeildText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data))
        emptyInput.classList.add('d-none');

    }
    inputFeild.value = '';
}
// display data function
const displayData = products => {
    console.log(products);
    const allProducts = products.docs.slice(0, 30);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.textContent = '';
    const totalDisplayProducts = document.getElementById('total-products');
    const errorMessage = document.getElementById('error-message');
    // error messages
    if (allProducts.length > 0) {
        errorMessage.classList.add('d-none')
        totalDisplayProducts.innerHTML = `<h2 class="text-center d-block">Books Found ${products.numFound} showing results ${allProducts.length}</h2>`;
    } else if (allProducts.length === 0) {
        errorMessage.classList.remove('d-none');
        totalDisplayProducts.innerHTML = `<h2 class="text-center d-none">Books Found ${products.numFound} showing results ${allProducts.length}</h2>`;
    }
    // getting products
    allProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${product.cover_i}-M.jpg" class="card-img-top p-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">Book Name: ${product.title}</h5>
            <p class="card-text">Author: ${product.author_name}</p>
            <p class="card-text">Publish Date: ${product.first_publish_year}</p>
            <p class="card-text">Publisher: ${product.publisher}</p>
        </div>
        `;
        cardsContainer.appendChild(div);

    })
}