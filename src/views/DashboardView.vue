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
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <h1>Historial de Conversiones</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Fecha Seleccionada</th>
                  <th scope="col">Monto Conversión</th>
                  <th scope="col">Monto Origen</th>
                  <th scope="col">Valor Moneda</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="name in info" :key="name.User">
                  <td>{{ name.User }}</td>
                  <td>{{ name.Fecha }}</td>
                  <td>{{ name.Fecha }}</td>
                  <td>{{ name.montoconversion }}</td>
                  <td>{{ name.montoorigen }}</td>
                  <td>{{ name.valormoneda }}</td>
                </tr>
              </tbody>
            </table>
            <button>Exportar Excel</button>
          </div>
        </div>
      </div>
    </div>
    <div id="username_display" class="display-8 mt-4 text-center">
      {{ this.email }}
    </div>
    <div id="rol" class="display-8 text-center">Rol: <text>Admin</text></div>

    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import axios from "axios";

const auth = getAuth();

export default {
  data() {
    return {
      info: [
        {
          User: "Admin",
          Fecha: "29-07-2023",
          montoconversion: "120390",
          valormoneda: "36.785",
          hora: "13:26",
          montoorigen: "4",
        },
        {
          User: "Admin",
          Fecha: "15-06-2022",
          montoconversion: "36785",
          valormoneda: "36.785",
          hora: "12:26",
          montoorigen: "1",
        },
      ],
      fecha: "",
      cantidad: 0,
      conversion: 0,
      email: auth.currentUser.email,
      monedas: {},
      valoractual: "",
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

    addData() {
      this.cars.push({
        model: this.addModel,
        year: this.addYear,
      });
      (this.addModel = ""), (this.addYear = "");
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
        });
    },
    convertirmoneda() {
      this.cantidadnueva = Math.ceil(this.cantidad);
      console.log(this.cantidadnueva);
      this.conversion = this.cantidadnueva * this.valoractual;
      console.log(this.conversion);
    },
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
