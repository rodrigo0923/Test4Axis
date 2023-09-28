<template>
  <div>
    <div class="text-center">¡Bienvenido!</div>
    <div id="username_display" class="display-6">{{ this.email }}</div>
    <div id="rol">Rol: <text>Administrador</text></div>
    <div>Converzor de moneda</div>
    <div>Historial de Converziones</div>
    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
  data() {
    return {
      email: auth.currentUser.email,
    };
  },
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          console.log("Sign Out completed");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
