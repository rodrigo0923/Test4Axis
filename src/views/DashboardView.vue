<template>
  <div class="container">
    <div class="text-center">¡Bienvenido!</div>
    <div id="app">
      <div>
        <h1 class="text-center">Conversor de Moneda</h1>
        <div class="row">
          <div class="col-sm-5">
            <label for="actual"> </label>
            <select name="" id="" class="form-control">
              <option value="UF">UF</option>
            </select>
          </div>
          <div class="col-sm-2">
            <label for="actual"> </label>
            <label
              class="text-center"
              style="margin-top: 30px; margin-left: 50px"
            >
              a
            </label>
          </div>
          <div class="col-sm-5">
            <label for="actual"> </label>
            <select name="" id="" class="form-control">
              <option value="Clp">CLP</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-center" style="margin-top: 10px">
            <h2>Ingrese Cantidad</h2>
            <input
              type="text"
              v-model="cantidad"
              class="form-control my-5"
              placeholder="Ingresar Cantidad"
            />
          </div>
        </div>
        <div class="row text-center" style="margin-top: -20px">
          <h2>Ingrese Fecha de Cambio</h2>
          <div class="col-md-12 text-center" style="margin-top: 20px">
            <input
              required
              class="text-center"
              type="date"
              v-model="fecha"
              :displayFormat="'DD.MM.YYYY'"
            />
          </div>
        </div>
        <div class="row" style="margin-top: 35px">
          <div class="col-md-6">
            <h3>Fecha Conversión: {{ this.fecha }}</h3>
          </div>
          <div class="col-md-6">
            <h3>Valor UF en pesos a la fecha: ${{ this.valoractual }}</h3>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <input :readonly="conversion" v-model="conversion" />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <button class="btn btn-primary" v-on:click="traerindicadores()">
              Convertir
            </button>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <h1>Historial de Conversiones</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Fecha Conversión</th>
                  <th scope="col">Fecha Inicial(actual)</th>
                  <th scope="col">Monto Conversión CLP</th>
                  <th scope="col">Monto Origen UF</th>
                  <th scope="col">User</th>
                  <th scope="col">Valor Moneda</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="name in Movimientos" :key="name.User">
                  <td>{{ name.FechaConversion }}</td>
                  <td>{{ name.FechaInicial }}</td>
                  <td>{{ name.MontoConversion }}</td>
                  <td>{{ name.Montoorigen }}</td>
                  <td>{{ name.User }}</td>
                  <td>{{ name.ValorMoneda }}</td>
                </tr>
              </tbody>
            </table>
            <button
              class="btn btn-secondary"
              v-on:click="descargarexcel('xlsx')"
            >
              Exportar Excel
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div id="username_display" class="display-8 mt-4 text-center">
        {{ this.email }}
      </div>
      <div id="rol" class="display-8 text-center">Rol: <text>Admin</text></div>

      <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
        Logout
      </button>
    </footer>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import axios from "axios";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import XLSX from "xlsx";

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
      rol: "admin",
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
    descargarexcel() {
      let data = XLSX.utils.json_to_sheet(this.Movimientos);
      const workbook = XLSX.utils.book_new();
      const filename = "Reporte-Conversión";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    signOut() {
      auth
        .signOut()
        .then(() => {
          console.log("Sign Out completed");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
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
  height: 1400px;
  margin-top: 480px;
}
</style>
