const tbody = document.getElementById("posztTableBody");
const submitBtn = document.getElementById('submit-btn');
const inputId = document.getElementById('poszt-id');
const inputName = document.getElementById('poszt-name');
const form = document.getElementById("crud-form");
let currentId = 0;


function TbShowData() {
    fetch("/fetchapi/php/crud/getposts.php")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                console.log(data.posztok);
                tbody.innerHTML = "";
                data.posztok.forEach(row => {
                    const tr = document.createElement("tr");
                    currentId++;

                    const tdId = document.createElement("td");
                    tdId.textContent = row.id;

                    const tdPoszt = document.createElement('td');
                    tdPoszt.textContent = row.nev;

                    const tdActions = document.createElement('td');
                    tdActions.className = 'actions';
                    tdActions.style.textAlign = 'right';
                    tdActions.style.justifyContent = 'flex-end';

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Módosítás';
                    editBtn.className = 'btn-edit';
                    editBtn.onclick = () => btEdit_Click(row.id, row.nev);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Törlés';
                    deleteBtn.className = 'btn-danger';
                    deleteBtn.onclick = () => btDanger_Click(row.id);

                    tdActions.appendChild(editBtn);
                    tdActions.appendChild(deleteBtn);

                    tr.appendChild(tdId);
                    tr.appendChild(tdPoszt);
                    tr.appendChild(tdActions);
                    tbody.appendChild(tr);
                });
                console.log(currentId);
                inputId.value=currentId;
            } else {
                tbody.innerHTML = `<tr><td colspan="5" style="color:red">${data.message}</td></tr>`;
            }
        })
        .catch(err => {
            tbody.innerHTML = `<tr><td colspan="5" style="color:red">Network error: ${err}</td></tr>`;
        });

}

function btEdit_Click(id, nev) {
    inputId.value = id;
    inputName.value = nev;
    submitBtn.textContent = 'Mentés'
}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const id = inputId.value.trim();
    const name = inputName.value.trim();
    console.log(formData);


    if (id==formData.id) {
        fetch("/fetchapi/php/crud/modify.php", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    TbShowData();
                } else {
                    alert("Something Wrong");
                }
            })
            .catch(err => {
                alert("Network alert!");
            });

    } else {

        fetch("/fetchapi/php/crud/new.php", {
            method: "POST",
            body: formData
        })
        
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    TbShowData();
                } else {
                    alert("Something Wrong");
                }
            })
            .catch(err => {
                alert("Network alert!");
            });
    }

});



document.addEventListener('DOMContentLoaded', TbShowData);
