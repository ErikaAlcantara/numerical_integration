<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useTrapezio } from "./util/trapezio";
import { useSimpson } from "./util/simpson";

const state = reactive({
  a: 3,
  b: 3.6,
  f: "1 / x",
  n: 6,
});

const tipo = ref("0");
const integral = ref(0);
const tabela = ref([]);

const calcular = () => {
  if (tipo.value === "0") calculaTrapezio();
  else calcularSimpson();
};

const calculaTrapezio = () => {
  const { resultado, resultados } = useTrapezio({
    a: state.a,
    b: state.b,
    n: state.n,
    funcao: state.f,
  });
  integral.value = resultado;
  tabela.value = resultados;
};

const calcularSimpson = () => {
  const { resultado, resultados } = useSimpson({
    a: state.a,
    b: state.b,
    n: state.n,
    funcao: state.f,
  });
  integral.value = resultado;
  tabela.value = resultados;
};

const onChange = (e) => {
  const value = e.target.value;
  tipo.value = value;
};
</script>

<template>
  <div class="container">
    <h1>Regra do Trapézio</h1>

    <div>
      <label for="tipo">Tipo de regra = </label>
      <select @change="onChange" id="tipo" name="tipo">
        <option value="0" selected>Trapezio</option>
        <option value="1">Simpson</option>
      </select>
    </div>
    <div>
      <label for="a">A = </label>
      <input v-model="state.a" type="number" id="a" name="a" />
    </div>
    <div>
      <label for="b">B = </label>
      <input v-model="state.b" type="number" id="b" name="b" />
    </div>
    <div>
      <label for="f">f(x) = </label>
      <input v-model="state.f" type="text" id="f" name="f" />
    </div>
    <div>
      <label for="n">N = </label>
      <input v-model="state.n" type="number" id="n" name="n" />
    </div>
    <div>
      <button @click="calcular">Calcular</button>
    </div>

    <div>
      <h2>Resultado:</h2>
      {{ integral }}
    </div>

    <table>
      <tr>
        <th>i</th>
        <th>xi</th>
        <th>f(xi)</th>
      </tr>
      <tr v-for="(row, irow) in tabela" :key="irow">
        <td>{{ row.i }}</td>
        <td>{{ row.xi }}</td>
        <td>{{ row.fxi }}</td>
      </tr>
    </table>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table {
  border-collapse: collapse;
  margin-top: 2rem;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.container {
  max-width: 56em;
  margin: 0 auto;
}
</style>
