//
document.getElementById("sign-up-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    console.log(e);
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;
    const res = await fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        user,password
      })
    });
    if(!res.ok) return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
      window.location.href = resJson.redirect;
    }
  })
  