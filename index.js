
// window.location.href = "/login.html";
const firebaseConfig = {
    apiKey: "AIzaSyAZk2Ps_EUapXOiXrddPghs8NtMBEva99M",
    authDomain: "crm-mobile-shop.firebaseapp.com",
    databaseURL: "https://crm-mobile-shop-default-rtdb.firebaseio.com",
    projectId: "crm-mobile-shop",
    storageBucket: "crm-mobile-shop.appspot.com",
    messagingSenderId: "298043435043",
    appId: "1:298043435043:web:e2f97ddc70fcdf0805a996"
  };
  firebase.initializeApp(firebaseConfig)

const productForm = firebase.database().ref('productForm')


document.getElementById("productform").addEventListener('submit' , submitForm)


function openPopup(){
    const main = document.getElementsByClassName("main")[0]
    main.classList.toggle("fade")
    const product = document.getElementsByClassName("productPage")[0]
    product.style.display = "block"

}

window.addEventListener('load', function() {
    var content = document.getElementsByClassName('content')[0];
    content.innerHTML = '<p>Loading...</p>';
    loadSavedContentFromFirebase();
});
function submitForm(e){
    e.preventDefault();

    var cname = getElementByVal('custName')
    var pname = getElementByVal('prodName')
    var phone = getElementByVal('phone')
    var issue = getElementByVal('custIssue')


    var content = document.getElementsByClassName('content')[0];
    var newDiv = document.createElement("div")
    newDiv.innerHTML = `
        <div class="c1 c2">
           
            <p class="sno">S .No</p>
            <p class="name" >${cname}</p>
            <img src="assets/eye.png" class="view" alt="View data">
            <img src="assets/trash.png" class="delete" alt="Delete Data">
            
         </div>

          
`;
    content.appendChild(newDiv)

    saveContent(cname , pname , phone , issue  )
    document.getElementById('productform').reset()
}

const saveContent =(cname ,pname,phone,issue ) =>{
    const currentDate = getDateEntry();
    var newProductForm = productForm.push()
    newProductForm.set({
        customerName : cname,
        productName : pname,
        Mobile :phone,
        issue : issue,
        date : currentDate
        
        
    })
}

const loadSavedContentFromFirebase = () => {


    productForm.once('value', function(snapshot) {
        // Initialize an empty string to store HTML content
        var htmlContent = '';

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            // Generate HTML content for each item
            htmlContent += `
                <div class="c1 c2">
                    <p class="sno">${item.date}</p>
                    <p class="name"id="name">${item.customerName}</p>
                    <img src="assets/eye.png" onclick=" viewData(this)" class="view" alt="View data">
                    <img src="assets/trash.png" class="delete" onclick ="deleteData(this)" alt="Delete Data">
                </div>
            `;
        });

        // Update the content with the generated HTML
        var content = document.getElementsByClassName('content')[0];
        content.innerHTML = htmlContent;
    });
}

const getElementByVal  = (id) =>{
    return document.getElementById(id).value;
}

const getDateEntry = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 to get 1-based month
    const day = currentDate.getDate();

    const dateEntry = day + '/' + month + '/ ' + year; // Format the date as needed
    return dateEntry;
}

function deleteData(element){
    console.log("clcicked")
    var parentElement = element.parentElement;
    console.log(parentElement);
    var customerName = parentElement.getElementsByClassName("name")
    console.log(customerName)
    var d = customerName.innerText
    console.log(d)
    for (var i = 0; i < customerName.length; i++) {
        var cust = customerName[i].innerText;
        console.log("Customer Name:", cust);
    }
    // Assuming you have initialized Firebase previously
    const database = firebase.database();
    
    // Reference to the list of data (assuming 'users' node contains user data)
    const usersRef = database.ref('productForm');
    
    // Define the user name you want to delete
    const userNameToDelete = cust;
    
    // Query to find the user with the specified name
    usersRef.orderByChild('customerName').equalTo(userNameToDelete).once('value', (snapshot) => {
        // Check if any user with the specified name exists
        if (snapshot.exists()) {
            // Iterate through each matching user node
            snapshot.forEach((childSnapshot) => {
                // Get the key of the user node to delete
                const userKey = childSnapshot.key;
    
                // Reference to the user node to delete
                const userRef = usersRef.child(userKey);
    
                // Remove the user from the database
                userRef.remove()
                    .then(() => {
                        console.log("User deleted successfully");
                    })
                    .catch((error) => {
                        console.error("Error deleting user: ", error);
                    });
            });
        } else {
            console.log("No user found with the specified name");
        }
        location.reload()
    });
}

// DELETE FUNCTIONALITY DONE HERE ABOVE QUIET DIFFICLT



let close = document.getElementsByClassName("close")[0].addEventListener("click" , () =>{
    const product = document.getElementsByClassName("productPage")[0]
    product.style.display = "none"
    const main = document.getElementsByClassName("main")[0]
    main.classList.toggle("fade")
    
})
function viewData(element){
    console.log("clcicked")
    var parentElement = element.parentElement;
    console.log(parentElement);
     var customerName = parentElement.getElementsByClassName("name")
     console.log(customerName)
     var productName = parentElement.getElementsByClassName("")
    var d = customerName.innerText
    console.log(d)
    for (var i = 0; i < customerName.length; i++) {
        var cust = customerName[i].innerText;
        // console.log("Customer Name:", cust);
    }
    var database = firebase.database();
    var usersRef = database.ref('productForm');

    var customerName = cust;

    
    usersRef.orderByChild('customerName').equalTo(customerName).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var userData = childSnapshot.val();
            console.log(userData);
            var custInput = document.getElementById("customerInput")
            var contInput = document.getElementById("contactInput")
            var devInput = document.getElementById("deviceInput")
            var issInput = document.getElementById("issueInput")
            const a = userData.customerName
            const b = userData.Mobile
            const c = userData.productName
            const d = userData.issue
            custInput.innerHTML = a
            contInput.innerHTML = b
            devInput.innerHTML = c
            issInput.innerHTML = d
            

            

        });
    });
    const main = document.getElementsByClassName("main")[0]
    main.classList.toggle("fade")
    
    const view = document.getElementsByClassName("viewData")[0]
    view.style.display = "block"




}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Redirect to a different page
    window.location.href = "mobile-warning.html";
    alert("smaller")
}
