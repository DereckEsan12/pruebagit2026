document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const message = document.getElementById('message');

  function showError(el, text){
    if(!el) return;
    el.textContent = text || '';
  }
  function showMessage(text, ok){
    if(!message) return;
    message.textContent = text || '';
    message.className = ok ? 'msg success' : 'msg error';
  }

  // Si ya hay sesión almacenada, mostrar bienvenida
  const logged = localStorage.getItem('loggedEmail');
  if(logged){
    document.body.innerHTML = `
      <main class="container">
        <div class="card">
          <h1>Bienvenido</h1>
          <p>Has iniciado sesión como <strong>${logged}</strong>.</p>
          <button id="logout" class="btn">Cerrar sesión</button>
        </div>
      </main>
    `;
    document.getElementById('logout').addEventListener('click', ()=>{
      localStorage.removeItem('loggedEmail');
      location.reload();
    });
    return;
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    showError(emailError,''); showError(passwordError,''); showMessage('');
    let valid = true;
    const emailVal = email.value.trim();
    const passVal = password.value;

    if(!emailVal || !/\S+@\S+\.\S+/.test(emailVal)){
      showError(emailError,'Introduce un correo válido');
      valid = false;
    }
    if(!passVal || passVal.length < 4){
      showError(passwordError,'La contraseña debe tener al menos 4 caracteres');
      valid = false;
    }
    if(!valid) return;

    // Autenticación simulada (demo)
    if(emailVal === 'demo@demo.com' && passVal === 'demo'){
      localStorage.setItem('loggedEmail', emailVal);
      showMessage('Inicio de sesión correcto. Redirigiendo...', true);
      setTimeout(()=> location.reload(), 700);
    } else {
      showMessage('Credenciales incorrectas', false);
    }
  });
});
