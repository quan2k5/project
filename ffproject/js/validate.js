function validate(options){
    //khai báo biến có options
    const btnClassSubmit=options.btnClassSubmit||'register-btn';
    btnClassSubmit
    const errorClass=options.errorClass||'error';
    const errorMessageClass=options.errorMessageClass||'error-message';
    const formGroupClass=options.formGroupClass||'list-item';
    const rules=options.rules;
    const message=options.messages;
    //1 lấy ra container bao đóng form
    // truy vấn dom của thư viện
    const registerForm=document.querySelector(options.container);
    //2 tất cả các element đều query dựa vào container
    const btnSignupSelector=registerForm.querySelector('.'+btnClassSubmit);
    const messageDefault={
        required:"this field is required",
        minlength:"please enter  at least {min} characters",
        regex:"please enter true format",
        equal_to:" this fiel is not same value",
        checkCategory:"this ",
    }
    let errors=[];
    const rulesMethod={
        required:function(valueinput,valueRule){
            return  valueinput!="";
        },
        checkCategory:function(valueinput,valueRule){
            if(btnSignupSelector.innerText=="Submit"){
                let list= JSON.parse(localStorage.getItem('category'))||[];
                let check=list.find(function(e){
                    return e.name==valueinput;
                });
                if(check){
                    return false;
                }else{
                    return true;
                }
            }
            return true;
        }   
    }
    function initEventData(){
        btnSignupSelector.addEventListener('click',handleSignupClick)
        registerForm.querySelectorAll(`.${formGroupClass} input`).forEach(function(e){
            e.addEventListener('blur', handleInputChange);
        });
    }
    function handleInputChange(event){
        const inputSelector=event.target;
        errors=errors.filter(function(e){
            return e.elementError!=inputSelector;
        });
        resetError(inputSelector);
        validateOneElement(inputSelector);
         if(errors.length){
            showErrors();
        }
    }
    function validateOneElement(element){
        const key1=element.name;
        let ruleAllforiputItem=rules[key1];
        let valueinput=element.value;
        for(const key in ruleAllforiputItem){
            let valueRule=ruleAllforiputItem[key];
            let result=rulesMethod[key](valueinput,valueRule);
            let keyMessage=key1+'_'+key;
            if(!result){
                // day loi vao bien luu tru
                let messageErrorDefault=messageDefault[key];
                messageErrorDefault=messageErrorDefault.replace('{min}',valueRule);
                errors.push({
                    elementError:element,
                    message:message[keyMessage] ?message[keyMessage]:messageErrorDefault
                })
                // show error
               return false;
            }
        }     
    }
    function handleSignupClick(event){
        event.preventDefault();
        errors=[];
        //vòng lặp for in
        for(const key1 in rules){
            let inputSelector=registerForm.querySelector('.'+key1);
            resetError(inputSelector);
            validateOneElement(inputSelector);
        }
        if(errors.length){
            showErrors();
        }else{
             options.success();
        }
        //gọi hàm success khi không có lỗi
    }
    function resetError(inputSelector){
        inputSelector.classList.remove(errorClass);
        inputSelector.closest('.'+formGroupClass).querySelector('.'+ errorMessageClass).innerHTML='';
    }
    function showErrors(){
        errors.forEach(function(e){
        let inputElement=e.elementError;
        inputElement.classList.add(errorClass);
        let divErrror=inputElement.closest('.'+formGroupClass).querySelector('.'+errorMessageClass);
        divErrror.innerHTML=e.message;
        })
    }
    initEventData();
}