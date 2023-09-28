<template>
  <div class="container">
    <form @submit.prevent="login" class="purple">
      <h2 class="mb-3">Iniciar Sesión</h2>
      <div class="input">
        <label for="email">Usuario</label>
        <input
          class="form-control"
          type="text"
          name="email"
          placeholder="User"
        />
      </div>
      <div class="input">
        <label for="password">Contraseña</label>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="password"
        />
      </div>

      <button type="submit" class="mt-4 btn-pers" id="login_button">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(submitEvent) {
      this.email = submitEvent.target.elements.email.value;
      this.password = submitEvent.target.elements.password.value;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          if (
            this.email === "rodrigo.yanez1401@gmail.com" &&
            this.password === "#h7zXYmZ**"
          ) {
            this.$router.push("/dashboard");
          } else if (
            this.email === "rodrigo.yanez1401@alumnos.ubiobio.cl" &&
            this.password === "#h7zXYmZ**"
          ) {
            this.$router.push("/dashboard2");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          let alert_1 = document.querySelector("#alert_1");
          alert_1.classList.remove("d-none");
          alert_1.innerHTML = errorMessage;
          console.log(alert_1);
        });
    },
  },
};
</script>
