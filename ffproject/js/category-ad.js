let listCategory = JSON.parse(localStorage.getItem('category')) || [];
let form=document.querySelector('.category-form');
let btn=form.querySelector('.category-submit');
let inputNameCategory=form.querySelector('input');
let contentEdit;
function validate(options){
    options.form.addEventListener('submit',function(e){
        e.preventDefault();
        let check=false;
        if(validation(options.rules)){
            check=true;
        }
        if(!check){
            options.success();
            inputNameCategory.value="";
        }    
    })
    inputNameCategory.addEventListener('blur',function(e){
        validation(options.rules)
    })
}
function validation(rulesSelector){
    let messageError;
    for(let i=0;i<rulesSelector.length;i++){
        messageError=rulesSelector[i].test(inputNameCategory.value);
        if(messageError){
            break;
        }
    }
    if(messageError){
        inputNameCategory.classList.add('error');
        inputNameCategory.parentElement.querySelector('.error-message').innerText=messageError;
    }else{
        inputNameCategory.classList.remove('error');
        inputNameCategory.parentElement.querySelector('.error-message').innerText='';
    }
    return messageError;
}
function checkCategory(){
    return{
        test:function(content){
            if(btn.innerText=="Submit"){
                let findCategory=listCategory.find(function(e){
                 return inputNameCategory.value==e.name;
                })
                return findCategory?"Tên danh mục đang bị trùng":undefined;
             }else if(btn.innerText=="Edit"){
                 if(inputNameCategory.value==contentEdit.name){
                     return undefined;
                 }
                 let findCategory=listCategory.find(function(e){
                     return inputNameCategory.value==e.name;
                    })
                 return findCategory?"Tên danh mục đang bị trùng":undefined;
             }
        }
    }
}
function required(){
    return{
        test:function(content){
            return content?undefined:"Tên danh mục đang trống";
        }
    }
}
function addCategory(){
    let newCategoryItem={
        id:Math.floor(Math.random()*1000000),
        name:inputNameCategory.value,
    }
    listCategory.push(newCategoryItem);
    localStorage.setItem("category",JSON.stringify(listCategory));
    renderCategory();
}
function editCategory(){
    listCategory.forEach(function(e){
        if(e.id==contentEdit.id){
            e.name=inputNameCategory.value;
            return;
        }
    });
    localStorage.setItem("category",JSON.stringify(listCategory));
    renderCategory();
    btn.innerText="Submit";
}
function successed(){
    if(btn.innerText=="Submit"){ 
        addCategory();   
    }else if(btn.innerText=="Edit"){
        editCategory();
    }
}
validate({
    form:form,
    rules:[
        required(),
        checkCategory(),
    ],
    success:successed,
}); 
function renderCategory() {
    document.querySelector('.table-category .body-category').innerHTML = '';
    listCategory.map(function (e) {
        document.querySelector('.table-category .body-category').innerHTML += `
        <tr class="category-item">
            <td class='category-id'>${e.id}</td>
            <td>${e.name}</td>
            <td>
                <button class="edit-category" id="${e.id}">Sửa</button>
                <button class="erase-category">Xóa</button>
            </td>
        </tr>  
        `
    });
}
renderCategory();
function manangeActionCategory(event) {
    let selector = event.target;
    if (selector.classList.contains("erase-category")) {
        let id = selector.closest('.category-item').querySelector('.category-id').innerText;
        listCategory = listCategory.filter(function (e) {
            return e.id != id;
        })
        inputNameCategory.parentElement.querySelector('.error-message').innerText='';
        inputNameCategory.classList.remove('error');
        localStorage.setItem('category', JSON.stringify(listCategory));
        btn.innerText="Submit";
        inputNameCategory.value='';
        renderCategory();  
    }else if(selector.classList.contains("edit-category")){
        let EditFindCategory=listCategory.find(function(e){
            return e.id==selector.id;
        })
        btn.innerText='Edit';
        inputNameCategory.classList.remove('error');
        inputNameCategory.parentElement.querySelector('.error-message').innerText='';
        inputNameCategory.value=EditFindCategory.name;
        contentEdit={
            id:EditFindCategory.id,
            name:EditFindCategory.name,
        };
    }
}
document.querySelector('.body-category').addEventListener('click', manangeActionCategory);

