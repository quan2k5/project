const categoryInCourse=document.querySelector('.category-in-product i');
function showCategoryinCourses(){
    let listCategory=JSON.parse(localStorage.getItem('category'))||[];
    if(listCategory.length){
       let categoryListCourse=categoryInCourse.parentElement.querySelector('ul');
       listCategory.map(function(e){
        categoryInCourse.innerHTML+=`
            
        `
       })






    } else{
        
    } 
}

categoryInProduct.addEventListener('click',showCategoryinCourses);