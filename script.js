let formEl = document.forms.formEl;
let email = formEl.elements.email;
let password = formEl.elements.password;

const tableEl = document.getElementById("tableBody");

let allData = "";

let load = document.getElementById("loader");
let loadCotents = `<div class ='load'>
<svg viewBox="25 25 50 50">
  <circle r="20" cy="50" cx="50"></circle>
</svg>
</div>`;

//  let tableArray = [];
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  let emailValue = email.value;
  let passwordValue = password.value;

  // let result= tableArray.find((item)=>{
  //     return item.email===emailValue})

  //   if(result)
  //    {
  //     alert('already register')
  //     email.value="";
  //     password.value="";
  //     return ;

  //    }
  //    else{
  //     alert('successful')
  //    }

  const data = {
    email: emailValue,
    password: passwordValue,
  };

  // tableArray.push(data)

  if (!checking()) {
    load.innerHTML = loadCotents;
    fetch("https://6641d8b43d66a67b343528f4.mockapi.io/appilcation", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      get();
      email.value = "";
      password.value = "";
      load.innerHTML = "";
    });
  } else [alert("already email found")];

  // tableArray.map((data)=>{lln jnjb
  //    let row= document.createElement('tr')

  //    let emailData=document.createElement('td')
  //    emailData.textContent=data.email;

  //   let passData = document.createElement('td')
  //   passData.textContent=data.password;

  //   let updateRow =document.createElement('td')
  //   let updateBtn =document.createElement('button')
  //   updateBtn.addEventListener("click",updateList)
  //   updateBtn.textContent="Update";

  //   let deleteRow =document.createElement('td')
  //   let deleteBtn =document.createElement('button')
  //   deleteBtn.addEventListener("click",deleteData)
  //   deleteBtn.textContent="Delete"

  //   row.append(emailData)
  //   row.append(passData)
  //   updateRow.append(updateBtn)
  //   row.append(updateRow)
  //   deleteRow.append(deleteBtn)
  //   row.append(deleteBtn)
  //   tableEl.append(row)

  // })
});

function get() {
  load.innerHTML = loadCotents;
  fetch("https://6641d8b43d66a67b343528f4.mockapi.io/appilcation", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      tableEl.innerHTML = "";
      allData = data;

      data.map((data) => {
        let row = document.createElement("tr");

        let emailData = document.createElement("td");
        emailData.textContent = data.email;

        let passData = document.createElement("td");
        passData.textContent = data.password;

        let updateRow = document.createElement("td");
        let updateBtn = document.createElement("button");
        updateBtn.addEventListener("click", () =>
          updateList(data.email, data.id)
        );
        updateBtn.textContent = "Update";
        updateBtn.className = "updateBtn";

        let deleteRow = document.createElement("td");
        let deleteBtn = document.createElement("button");

        deleteBtn.addEventListener("click", () =>
          deleteData(data.id, data.email)
        );
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";

        row.append(emailData);
        row.append(passData);
        updateRow.append(updateBtn);
        row.append(updateRow);
        deleteRow.append(deleteBtn);
        row.append(deleteBtn);
        tableEl.append(row);
        load.innerHTML = "";
      });
    });
}

get();

function deleteData(id, email) {
  if (confirm(`delete ${email}`) === true) {
    fetch(`https://6641d8b43d66a67b343528f4.mockapi.io/appilcation/${id}`, {
      method: "DELETE",
    }).then(() => {
      get();
    });
  } else {
    alert("Cancel");
  }
}

function updateList(email, id) {
  let promptEmail = prompt(" enteremail id", email);

  if (promptEmail === "") {
    console.log("update error");
    return;
  } else if (promptEmail === null) {
    console.log("update error");
    return;
  }

  let updateData = {
    email: promptEmail,
  };
  console.log(updateData);

  fetch(`https://6641d8b43d66a67b343528f4.mockapi.io/appilcation/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then(() => {
      console.log("successfull");

      get();
    })
    .catch((err) => console.log(err));
}

function checking() {
  let check = allData.find((item) => {
    return item.email === email.value;
  });
  return check;
}
