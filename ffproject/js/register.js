function registerValidation(){
   const registerForm=document.querySelector('.sign-up-form');
   const registerbtn=registerForm.querySelector('.btn-register');
   const signInform=document.querySelector('.sign-in-form');
   const deleteRegister=registerForm.querySelector('.delete-register');
   const namef=registerForm.querySelector('.name');
   const email=registerForm.querySelector('.email');
   const password=registerForm.querySelector('.password');
   const confirmt=registerForm.querySelector('.confirm');
   let listUsers=JSON.parse(localStorage.getItem('listUsers'))||[];
   const headRegister=document.querySelector('.sign-in');
   const modaloverlay=document.querySelector('.modal-overlay');
   const modal=document.querySelector('.modal');
   const linkChange=registerForm.querySelector('.link-change');
   console.log(signInform);
   function subAction(){
      headRegister.addEventListener('click',headRegisterClick);
      deleteRegister.addEventListener('click',deleteRegisterForm);
      modaloverlay.addEventListener('click',deleteRegisterForm);
      linkChange.addEventListener('click',changeLoginform);

   }
   function changeLoginform(){
      event.preventDefault();
      signInform.style.display="block";
      registerForm.style.display="none";
   }
   function deleteRegisterForm(){
      modal.style.display='none';
   }
   function headRegisterClick(){
      modal.style.display="flex";
      registerForm.style.display="block";
      signInform.style.display="none";
   }
   subAction();
   function validateSuccess(element){
      let allInput= element.querySelectorAll('input');
      let newUsers={};
      allInput.forEach(function(e){
         newUsers[e.name]=e.value;
      });
      
      newUsers['status']="";
      listUsers.push(newUsers);
      localStorage.setItem('listUsers',JSON.stringify(listUsers));
      changeLoginform();
      return true;
   }
   validation({
      btnClassForm:registerbtn,
      form:registerForm,
      rules:[
         isName(namef,"vui lòng nhập tên đầy đủ"),
         isRequired(email,"{element} cua ban đang trống"),
         isEmail(email,"Email của bạn ko hợp lệ"),
         isCheckEmail(email,"Email cua ban bi trung"),
         isPassword(password,"Mat khau phai co it nhat 6 ky tu"),
         isRequired(password,"{element} cua ban đang trống"),
         isRequired(confirmt,"{element} cua ban đang trống"),
         isConfirm(confirmt,"mật khẩu của bạn bị sai",function(){
               return password.value;
         })
      ],
      success:validateSuccess,
   })
}
registerValidation();
