<template>
  <div class="container">
    <div class="text-center">¡Bienvenido!</div>
    <div id="app">
      <div>
        <h1 class="text-center">Conversor de Moneda</h1>
        <div class="row">
          <div class="col-sm-6">
            <label for="actual"> </label>
            <select name="" id="" class="form-control">
              <option value="UF">UF</option>
            </select>
          </div>
          <div class="col-sm-6">
            <label for="actual"> </label>
            <select name="" id="" class="form-control">
              <option value="Clp">CLP</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <h2>Ingrese Cantidad</h2>
            <input
              type="text"
              v-model="cantidad"
              class="form-control my-5"
              placeholder="Ingresar Cantidad"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <input
              class="text-center"
              type="date"
              v-model="fecha"
              :displayFormat="'DD.MM.YYYY'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h3>Fecha Conversión: {{ this.fecha }}</h3>
          </div>
          <div class="col-md-6">
            <h3>Valor UF en pesos a la fecha: ${{ this.valoractual }}</h3>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <input v-model="conversion" />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <button class="btn btn-primary" v-on:click="traerindicadores()">
              Convertir
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="username_display" class="display-8 mt-4 text-center">
      {{ this.email }}
    </div>
    <div id="rol" class="display-8 text-center">Rol: <text>User</text></div>

    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import axios from "axios";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkYQvEXXNWw6WSudXOybc3YNZ11ONTb9g",
  authDomain: "vuejstest-942bd.firebaseapp.com",
  databaseURL: "https://vuejstest-942bd-default-rtdb.firebaseio.com",
  projectId: "vuejstest-942bd",
  storageBucket: "vuejstest-942bd.appspot.com",
  messagingSenderId: "758017724877",
  appId: "1:758017724877:web:f9763fd719bc3ea29b7484",
  measurementId: "G-B8HXGSFBYQ",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export default {
  data() {
    return {
      rol: "User",
      Movimientos: [],
      fecha: "",
      fechaactual: "",
      cantidad: 0,
      conversion: 0,
      valoractual: "",
      email: auth.currentUser.email,
      monedas: {},
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
    async getTodos() {
      let TodoslosDatos = [];
      const querySnapshot = await getDocs(collection(db, "Movimientos"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const todo = {
          id: doc.id,
          User: doc.data().User,
          ValorMoneda: doc.data().ValorMoneda,
          FechaConversion: doc.data().FechaConversion,
          MontoConversion: doc.data().MontoConversion,
          FechaInicial: doc.data().FechaInicial,
          Montoorigen: doc.data().Montoorigen,
        };
        TodoslosDatos.push(todo);
        console.log(TodoslosDatos);
      });
      this.Movimientos = TodoslosDatos;
      console.log("Array Movimientos", this.Movimientos);
    },

    async añadirRegistro() {
      await addDoc(collection(db, "Movimientos"), {
        User: this.rol,
        ValorMoneda: this.valoractual,
        Montoorigen: this.cantidad,
        FechaConversion: this.fecha,
        MontoConversion: this.conversion,
        FechaInicial: this.fechaactual,
      });
    },

    async traerindicadores() {
      let fechanueva = this.fecha.split("-").reverse().join("-");
      console.log(fechanueva);
      await axios
        .get("https://mindicador.cl/api/uf/" + fechanueva)
        .then((response) => {
          console.log(response);
          this.monedas = response.data.results;
          console.log("valor actual:", response.data.serie[0].valor);
          console.log("Fecha:", response.data.serie[0].fecha);
          this.valoractual = response.data.serie[0].valor;
          this.fecha = response.data.serie[0].fecha;
          this.convertirmoneda();
          this.añadirRegistro();
          this.clearall();
          this.getTodos();
        });
    },
    convertirmoneda() {
      this.conversion = this.cantidad * this.valoractual;
      this.conversion = Math.ceil(this.conversion);
      console.log(this.conversion);
    },
    getfechaactual() {
      this.fechaactual = new Date().toLocaleDateString();
    },
    clearall() {
      this.cantidad = "";
      this.conversion = "";
    },
  },
  mounted() {
    this.getTodos();
    this.getfechaactual();
  },
};
</script>
<style scoped>
.container {
  position: absolute;
  width: 900px;
  height: 900px;
  margin-top: 260px;
}
</style>
