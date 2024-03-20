function validateLoginForm(){
const logInform=document.querySelector('.sign-in-form');
const email=logInform.querySelector('.email');
const password=logInform.querySelector('.password');
const logInbtn=logInform.querySelector('.btn-login');
let listUsers=JSON.parse(localStorage.getItem('listUsers'))||[];
function isCheckUser(selector,messageError){
    return{
        paramentor:selector,
        test:function(){
            return messageError;
        }
    }
}
function LoginSuccess(element){
    let checked=0;
    listUsers.forEach(function(e){
        if(e.password== password.value && e.email== email.value){
            e.status='active';
            checked=1;
        }else{
            e.status='';
        }
    });
    if(checked){
        localStorage.setItem('listUsers',JSON.stringify(listUsers));
    }else{
    }
}

validation({
    btnClassForm:logInbtn,
    form:logInform,
    rules:[
         isRequired(email,"Email cua ban đang trống"),
         isEmail(email,"Email của bạn ko hợp lệ"),
         isRequired(password,"Mat khau cua ban đang trống"),
    ],
    success:LoginSuccess,
    // rlex:isCheckUser(password,'Tài khoản đăng nhập của bạn sai'),
 })
}
validateLoginForm();